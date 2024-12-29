// src/pages/riderBookings/EditRiderBooking.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookRiderById, updateBookRider } from '../../api';
import { toast } from 'react-toastify';
import loadGoogleMap from '../../utils/loadGoogleMaps';

const EditRiderBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        client: JSON.parse(localStorage.getItem('user'))?.id || '',
        pickup_address: '',
        pickup_lat: '',
        pickup_lng: '',
        delivery_address: '',
        delivery_lat: '',
        delivery_lng: '',
        estimated_distance_km: '',
        estimated_delivery_time: '',
        booking_price: '',
        payment_type: 'Cash',
    });

    const [loading, setLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
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

    useEffect(() => {
        const loadBookingDetails = async () => {
            try {
                const data = await fetchBookRiderById(id);
                if (data.status !== 'Pending') {
                    toast.error('Only bookings with status "Pending" can be edited.');
                    navigate('/rider-bookings');
                    return;
                }
                setFormData({
                    client: data.client || '',
                    pickup_address: data.pickup_address || '',
                    pickup_lat: data.pickup_lat || '',
                    pickup_lng: data.pickup_lng || '',
                    delivery_address: data.delivery_address || '',
                    delivery_lat: data.delivery_lat || '',
                    delivery_lng: data.delivery_lng || '',
                    estimated_distance_km: data.estimated_distance_km || '',
                    estimated_delivery_time: data.estimated_delivery_time || '',
                    booking_price: data.booking_price || '',
                    payment_type: data.payment_type || 'Cash',
                    package_description: data.package_description || '',
                    recipient_name: data.recipient_name || '',
                    recipient_phone: data.recipient_phone || '',
                    package_name: data.package_name || '',
                });
            } catch (error) {
                toast.error('Failed to load rider booking details.');
                console.error('Error fetching rider booking details:', error);
                navigate('/rider-bookings');
            } finally {
                setLoading(false);
            }
        };

        loadBookingDetails();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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

    const calculateBookingPrice = (distanceKm) => {
        const first5kmRate = 1000; // RWF
        const additional5kmRate = 500; // RWF per additional 5 km
        let totalPrice = first5kmRate;
        if (distanceKm > 5) {
            const additionalDistance = distanceKm - 5;
            const additionalBlocks = Math.ceil(additionalDistance / 5);
            totalPrice += additionalBlocks * additional5kmRate;
        }
        return totalPrice;
    };

    const calculateDistanceAndTime = () => {
        if (
            formData.pickup_lat &&
            formData.pickup_lng &&
            formData.delivery_lat &&
            formData.delivery_lng &&
            window.google &&
            window.google.maps
        ) {
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
                            const bookingPrice = calculateBookingPrice(distanceKm);

                            setFormData((prevState) => ({
                                ...prevState,
                                estimated_distance_km: distanceKm,
                                estimated_delivery_time: `${durationMin} minutes`,
                                booking_price: bookingPrice,
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

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser.');
            return;
        }

        setLocationLoading(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const geocoder = new window.google.maps.Geocoder();

                const latlng = { lat: latitude, lng: longitude };
                geocoder.geocode({ location: latlng }, (results, status) => {
                    if (status === 'OK') {
                        if (results[0]) {
                            setFormData((prevState) => ({
                                ...prevState,
                                pickup_address: results[0].formatted_address,
                                pickup_lat: latitude,
                                pickup_lng: longitude,
                            }));
                            toast.success('Current location retrieved successfully.');
                        } else {
                            toast.error('No results found for your location.');
                        }
                    } else {
                        toast.error(`Geocoder failed due to: ${status}`);
                    }
                    setLocationLoading(false);
                });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        toast.error('User denied the request for Geolocation.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        toast.error('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        toast.error('The request to get user location timed out.');
                        break;
                    default:
                        toast.error('An unknown error occurred.');
                        break;
                }
                setLocationLoading(false);
            }
        );
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

    const handleUpdateRiderBooking = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            await updateBookRider(id, formData);
            toast.success('Rider booking updated successfully.');
            navigate('/rider-bookings');
        } catch (error) {
            toast.error('An error occurred while updating the rider booking.');
            console.error('Error updating rider booking:', error);
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="mt-16 px-5">
                <div className="container">
                    <div className="text-center py-10">
                        Loading rider booking details...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-setting-right section-right">
            <div className="box">
                <div className="widget-tabs style-small">
                    <div className="widget-content-tab">
                        <div className="widget-content-inner active">
                            <div className="row">
                                <div className="profile-wrap">
                                    <div className="profile-info">
                                        <h4>Edit Rider Booking</h4>
                                        <p>Estimated Distance: {formData.estimated_distance_km || 'N/A'} km</p>
                                        <p>Estimated Delivery Time: {formData.estimated_delivery_time || 'N/A'}</p>
                                        <p>Booking Price: {formData.booking_price ? `${formData.booking_price} RWF` : 'N/A'}</p>
                                    </div>
                                    <div className="profile-btn">
                                        <a href="/rider-bookings" className="btn-update tf-button-default">
                                            Go Back <i className="icon-arrow-top-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <form className="shop-checkout" onSubmit={handleUpdateRiderBooking}>
                                <div className="cols mb-5">
                                    <fieldset className="tf-field relative">
                                        <input
                                            name="pickup_address"
                                            className="tf-input style-1"
                                            type="text"
                                            value={formData.pickup_address}
                                            onChange={(e) => handleAddressChange(e, 'pickup')}
                                            required
                                        />
                                        {pickupSuggestions.length > 0 && (
                                            <ul className="list-group position-absolute mt-1 z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                                                {pickupSuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        className="list-group-item list-group-item-action px-4 py-2 cursor-pointer hover:bg-gray-100"
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
                                    <button
                                        type="button"
                                        onClick={handleUseCurrentLocation}
                                        className="btn-update tf-button-default px-8"
                                        disabled={locationLoading}
                                    >
                                        {locationLoading ? 'Locating...' : 'Use Current Location'}
                                    </button>
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
                                            <ul className="list-group position-absolute mt-1 z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                                                {deliverySuggestions.map((suggestion, index) => (
                                                    <li
                                                        key={index}
                                                        className="list-group-item list-group-item-action px-4 py-2 cursor-pointer hover:bg-gray-100"
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
                                <button type="submit" className="tf-btn" disabled={formLoading}>
                                    {formLoading ? 'Updating Booking...' : 'Update Rider Booking'}
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

export default EditRiderBooking;