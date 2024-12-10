// web/AddDeliveryRequest.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDeliveryRequest } from '../../api';
import { toast } from 'react-toastify';
import loadGoogleMap from '../../utils/loadGoogleMaps';

const AddDeliveryRequest = () => {
    const [formData, setFormData] = useState({
        client: JSON.parse(localStorage.getItem('user'))?.id || '',
        package_name: '',
        pickup_address: '',
        pickup_lat: '',
        pickup_lng: '',
        delivery_address: '',
        delivery_lat: '',
        delivery_lng: '',
        package_description: '',
        recipient_name: '',
        recipient_phone: '',
        estimated_distance_km: '',
        estimated_delivery_time: '',
        value_of_product: '',
        delivery_price: '',
        payment_type: 'Mobile Money',
        image: null,
        status: 'Pending',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [deliverySuggestions, setDeliverySuggestions] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        // Load Google Maps API
        loadGoogleMap()
            .then(() => {
                setMapLoaded(true);
            })
            .catch((error) => {
                console.error('Error loading Google Maps:', error);
                toast.error('Failed to load Google Maps.');
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    const handleAddDeliveryRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        try {
            await addDeliveryRequest(data);
            toast.success('Delivery request added successfully.');
            navigate('/delivery-requests');
        } catch (error) {
            toast.error('An error occurred while adding the delivery request.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAddressSuggestions = async (query) => {
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=rw`;
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
            return [];
        }
    };

    const handleAddressChange = async (e, type) => {
        const query = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            [`${type}_address`]: query,
        }));
        if (query.length > 2) {
            const suggestions = await fetchAddressSuggestions(query);
            type === 'pickup' ? setPickupSuggestions(suggestions) : setDeliverySuggestions(suggestions);
        } else {
            type === 'pickup' ? setPickupSuggestions([]) : setDeliverySuggestions([]);
        }
    };

    const handleAddressSelect = (suggestion, type) => {
        setFormData((prevState) => ({
            ...prevState,
            [`${type}_address`]: suggestion.display_name,
            [`${type}_lat`]: parseFloat(suggestion.lat),
            [`${type}_lng`]: parseFloat(suggestion.lon),
        }));
        type === 'pickup' ? setPickupSuggestions([]) : setDeliverySuggestions([]);

        if (formData.pickup_lat && formData.delivery_lat && mapLoaded) {
            calculateDistanceAndTime();
        }
    };

    const calculateDeliveryPrice = (distanceKm) => {
        const first5kmRate = 1000;
        const additional5kmRate = 500;
        let totalPrice = first5kmRate;
        if (distanceKm > 5) {
            const additionalDistance = distanceKm - 5;
            const additionalBlocks = Math.ceil(additionalDistance / 5);
            totalPrice += additionalBlocks * additional5kmRate;
        }
        return totalPrice;
    };

    const calculateDistanceAndTime = () => {
        if (formData.pickup_lat && formData.pickup_lng && formData.delivery_lat && formData.delivery_lng && window.google && window.google.maps) {
            const origin = new window.google.maps.LatLng(formData.pickup_lat, formData.pickup_lng);
            const destination = new window.google.maps.LatLng(formData.delivery_lat, formData.delivery_lng);

            const service = new window.google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [destination],
                    travelMode: window.google.maps.TravelMode.DRIVING,
                    unitSystem: window.google.maps.UnitSystem.METRIC,
                },
                (response, status) => {
                    if (status === 'OK') {
                        const element = response.rows[0].elements[0];
                        if (element.status === 'OK') {
                            const distanceKm = (element.distance.value / 1000).toFixed(2);
                            const durationMin = Math.ceil(element.duration.value / 60);
                            const deliveryPrice = calculateDeliveryPrice(distanceKm);

                            setFormData((prevState) => ({
                                ...prevState,
                                estimated_distance_km: distanceKm,
                                estimated_delivery_time: durationMin,
                                delivery_price: deliveryPrice,
                            }));
                        } else {
                            toast.error(`Distance Matrix element error: ${element.status}`);
                        }
                    } else {
                        toast.error(`Distance Matrix API error: ${status}`);
                    }
                }
            );
        }
    };

    useEffect(() => {
        if (mapLoaded) {
            calculateDistanceAndTime();
        }
    }, [
        mapLoaded,
        formData.pickup_lat,
        formData.pickup_lng,
        formData.delivery_lat,
        formData.delivery_lng,
    ]);

    return (
        <div className="section-setting-right section-right">
            <div className="box">
                <div className="widget-tabs style-small">
                    <div className="widget-content-tab">
                        <div className="widget-content-inner active">
                            <div className="row">
                                <div className="profile-wrap">
                                    <div className="profile-info">
                                        <h4>Send New Delivery Request</h4>
                                        <p>Estimated Distance: {formData.estimated_distance_km} km</p>
                                        <p>Estimated Delivery Time: {formData.estimated_delivery_time} minutes</p>
                                        <p>Delivery Price: {formData.delivery_price} RWF</p>
                                    </div>
                                    <div className="profile-btn">
                                        <input id="file-input" type="file" />
                                        <a href="/delivery-requests" className="btn-update tf-button-default">
                                            Go Back <i className="icon-arrow-top-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <form className="shop-checkout" onSubmit={handleAddDeliveryRequest}>
                                <div className="cols mb-5">
                                    <fieldset className="tf-field">
                                        <input
                                            name="package_name"
                                            className="tf-input style-1"
                                            type="text"
                                            value={formData.package_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label className="tf-field-label fs-15" htmlFor="field1">
                                            Package Name
                                        </label>
                                    </fieldset>
                                    <fieldset className="tf-field">
                                        <input
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="tf-input style-1"
                                        />
                                        <label className="tf-field-label fs-15" htmlFor="field1">
                                            Image
                                        </label>
                                    </fieldset>
                                </div>
                                <div className="cols mb-5">
                                    <fieldset className="tf-field">
                                        <input
                                            name="recipient_name"
                                            className="tf-input style-1"
                                            type="text"
                                            value={formData.recipient_name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label className="tf-field-label fs-15" htmlFor="field1">
                                            Recipient Name
                                        </label>
                                    </fieldset>
                                    <fieldset className="tf-field">
                                        <input
                                            name="recipient_phone"
                                            className="tf-input style-1"
                                            type="text"
                                            value={formData.recipient_phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <label className="tf-field-label fs-15" htmlFor="field1">
                                            Recipient Phone
                                        </label>
                                    </fieldset>
                                </div>
                                <fieldset className="tf-field">
                                    <textarea
                                        name="package_description"
                                        className="tf-input style-1"
                                        rows="4"
                                        value={formData.package_description}
                                        onChange={handleInputChange}
                                    ></textarea>
                                    <label className="tf-field-label type-textarea fs-15" htmlFor="">
                                        Package Description
                                    </label>
                                </fieldset>
                                <div className="cols mb-5">
                                    <fieldset className="tf-field">
                                        <input
                                            name="pickup_address"
                                            className="tf-input style-1"
                                            type="text"
                                            value={formData.pickup_address}
                                            onChange={(e) => handleAddressChange(e, 'pickup')}
                                            required
                                        />
                                        {pickupSuggestions.length > 0 && (
                                            <ul className="list-group position-absolute mt-1">
                                                {pickupSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        className="list-group-item list-group-item-action"
                                                        onClick={() => handleAddressSelect(suggestion, 'pickup')}
                                                    >
                                                        {suggestion.display_name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <label className="tf-field-label fs-15" htmlFor="field1">
                                            Pick Up Address
                                        </label>
                                    </fieldset>
                                    <fieldset className="tf-field">
                                        <input
                                            name="delivery_address"
                                            className="tf-input style-1"
                                            type="text"
                                            value={formData.delivery_address}
                                            onChange={(e) => handleAddressChange(e, 'delivery')}
                                            required
                                        />
                                        {deliverySuggestions.length > 0 && (
                                            <ul className="list-group position-absolute mt-1">
                                                {deliverySuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        className="list-group-item list-group-item-action"
                                                        onClick={() => handleAddressSelect(suggestion, 'delivery')}
                                                    >
                                                        {suggestion.display_name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <label className="tf-field-label fs-15" htmlFor="field1">
                                            Delivery Address
                                        </label>
                                    </fieldset>
                                </div>
                                <button type="submit" className="tf-btn" disabled={loading}>
                                    {loading ? 'Sending Request...' : 'Send Delivery Request'}
                                    <i className="icon-arrow-top-right"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDeliveryRequest;
