// src/components/AddDeliveryRequest.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDeliveryRequest } from '../../api';
import { toast } from 'react-toastify';
import loadGoogleMap from '../../utils/loadGoogleMaps';
import CourierPayment from '../../components/CourierPayment'; // Corrected import statement

const AddDeliveryRequest = () => {
    // Initialize form data state
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

    // State variables for loading indicators
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false); // State for location loading
    const navigate = useNavigate();
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [deliverySuggestions, setDeliverySuggestions] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);

    // Fetch customer details from localStorage
    const customer = JSON.parse(localStorage.getItem('user')) || {
        name: '',
        email: '',
        phone_number: '',
    };

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

    /**
     * Handles changes to input fields and updates formData state.
     * @param {Object} e - Event object from input change.
     */
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /**
     * Handles changes to the image input and updates formData state.
     * @param {Object} e - Event object from input change.
     */
    const handleImageChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    /**
     * Handles adding a new delivery request after successful payment.
     * @param {Object} response - Payment response object.
     */
    const handlePaymentSuccess = async (response) => {
        setLoading(true);
        try {
            // Prepare form data for submission
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            });

            await addDeliveryRequest(data);
            toast.success('Delivery request added successfully.');
            navigate('/delivery-requests'); // Redirect on success
        } catch (error) {
            toast.error('An error occurred while adding the delivery request.');
            console.error('Error adding delivery request:', error);
            navigate('/delivery-request/add'); // Redirect on failure
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handles the failure of the payment process.
     * @param {Object} [response] - Optional payment response object.
     */
    const handlePaymentFailure = (response) => {
        toast.error('Payment failed or was canceled. Please try again.');
        navigate('/delivery-request/add'); // Redirect on failure or modal close
    };

    /**
     * Fetches address suggestions from the Nominatim API.
     * @param {string} query - Address query string.
     * @returns {Array} - Array of address suggestions.
     */
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

    /**
     * Handles changes to address fields and fetches address suggestions.
     * @param {Object} e - Event object from input change.
     * @param {string} type - Type of address ('pickup' or 'delivery').
     */
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

    /**
     * Handles selection of an address suggestion and updates formData state.
     * @param {Object} suggestion - Selected address suggestion.
     * @param {string} type - Type of address ('pickup' or 'delivery').
     */
    const handleAddressSelect = (suggestion, type) => {
        setFormData((prevState) => ({
            ...prevState,
            [`${type}_address`]: suggestion.display_name,
            [`${type}_lat`]: parseFloat(suggestion.lat),
            [`${type}_lng`]: parseFloat(suggestion.lon),
        }));
        type === 'pickup' ? setPickupSuggestions([]) : setDeliverySuggestions([]);

        // Calculate distance and time if both pickup and delivery locations are set
        if (formData.pickup_lat && formData.delivery_lat && mapLoaded) {
            calculateDistanceAndTime();
        }
    };

    /**
     * Calculates delivery price based on distance.
     * @param {number} distanceKm - Estimated distance in kilometers.
     * @returns {number} - Calculated delivery price in RWF.
     */
    const calculateDeliveryPrice = (distanceKm) => {
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

    /**
     * Calculates the distance and estimated delivery time using Google Maps Distance Matrix API.
     */
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
                            const deliveryPrice = calculateDeliveryPrice(distanceKm);

                            setFormData((prevState) => ({
                                ...prevState,
                                estimated_distance_km: distanceKm,
                                estimated_delivery_time: `${durationMin} minutes`,
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

    /**
     * Handles fetching and setting the user's current location as the pickup address.
     */
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
        // Recalculate distance and time whenever relevant form data changes
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

    // Form validation: Check if all required fields are filled with valid data
    const isFormValid =
        formData.pickup_address &&
        formData.pickup_lat &&
        formData.pickup_lng &&
        formData.delivery_address &&
        formData.delivery_lat &&
        formData.delivery_lng &&
        formData.estimated_distance_km &&
        formData.estimated_delivery_time &&
        formData.delivery_price &&
        formData.recipient_name &&
        formData.recipient_phone &&
        formData.package_name &&
        formData.value_of_product;

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
                                        <p>Estimated Distance: {formData.estimated_distance_km || 'N/A'} km</p>
                                        <p>Estimated Delivery Time: {formData.estimated_delivery_time || 'N/A'}</p>
                                        <p>Delivery Price: {formData.delivery_price ? `${formData.delivery_price} RWF` : 'N/A'}</p>
                                    </div>
                                    <div className="profile-btn">
                                        <a href="/delivery-requests" className="btn-update tf-button-default">
                                            Go Back <i className="icon-arrow-top-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <form className="shop-checkout" onSubmit={(e) => e.preventDefault()}>
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
                                        <label className="tf-field-label fs-15" htmlFor="package_name">
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
                                        <label className="tf-field-label fs-15" htmlFor="image">
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
                                        <label className="tf-field-label fs-15" htmlFor="recipient_name">
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
                                        <label className="tf-field-label fs-15" htmlFor="recipient_phone">
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
                                    <label className="tf-field-label type-textarea fs-15" htmlFor="package_description">
                                        Package Description
                                    </label>
                                </fieldset>
                                <div className="cols mb-5">
                                    {/* Pickup Address Field */}
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
                                        <label className="tf-field-label fs-15" htmlFor="pickup_address">
                                            Pick Up Address
                                        </label>
                                    </fieldset>
                                    {/* Use Current Location Button */}
                                    <button
                                        type="button"
                                        onClick={handleUseCurrentLocation}
                                        className="btn-update tf-button-default px-8"
                                        disabled={locationLoading}
                                    >
                                        {locationLoading ? 'Locating...' : 'Use Current Location'}
                                    </button>
                                    {/* Delivery Address Field */}
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
                                        <label className="tf-field-label fs-15" htmlFor="delivery_address">
                                            Delivery Address
                                        </label>
                                    </fieldset>
                                </div>
                                {/* Payment Button */}
                                {isFormValid ? (
                                    <div className="profile-btn">
                                        <CourierPayment
                                            amount={Number(formData.delivery_price)}
                                            tx_ref={`delivery_request_${Date.now()}`}
                                            customer={{
                                                email: customer.email,
                                                phone_number: customer.phone_number,
                                                name: customer.name,
                                            }}
                                            onSuccess={handlePaymentSuccess}
                                            onFailure={handlePaymentFailure}
                                        />
                                    </div>
                                ) : (
                                    <button type="button" className="tf-btn" disabled>
                                        Send Delivery Request
                                        <i className="icon-arrow-top-right"></i>
                                    </button>
                                )}
                                {/* Loading Indicator */}
                                {loading && <p>Processing your delivery request...</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDeliveryRequest;
