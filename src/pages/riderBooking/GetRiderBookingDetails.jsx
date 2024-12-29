import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBookRiderById, cancelBookRider, completeBookRider } from '../../api';
import { toast } from 'react-toastify';

const GetRiderBookingDetails = () => {
    const { id } = useParams();
    const [riderBooking, setRiderBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pickupCoords, setPickupCoords] = useState(null);
    const [deliveryCoords, setDeliveryCoords] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadRiderBookingDetails = async () => {
            try {
                const data = await fetchBookRiderById(id);
                setRiderBooking(data);
                setPickupCoords({ lat: parseFloat(data.pickup_lat), lng: parseFloat(data.pickup_lng) });
                setDeliveryCoords({ lat: parseFloat(data.delivery_lat), lng: parseFloat(data.delivery_lng) });
            } catch (error) {
                toast.error('Failed to load rider booking details.');
                navigate('/rider-bookings');
            } finally {
                setLoading(false);
            }
        };
        loadRiderBookingDetails();
    }, [id, navigate]);

    useEffect(() => {
        if (pickupCoords && deliveryCoords && window.google) {
            const map = new window.google.maps.Map(document.getElementById("googleMap"), {
                center: pickupCoords,
                zoom: 12,
            });

            new window.google.maps.Marker({
                position: pickupCoords,
                map,
                title: "Pickup Location",
                icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            });

            new window.google.maps.Marker({
                position: deliveryCoords,
                map,
                title: "Delivery Location",
                icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            });

            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer({ map });

            directionsService.route(
                {
                    origin: pickupCoords,
                    destination: deliveryCoords,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                    }
                }
            );
        }
    }, [pickupCoords, deliveryCoords]);

    const handleCancel = async () => {
        if (riderBooking.status !== 'Pending') {
            toast.error('Only bookings with status "Pending" can be canceled.');
            return;
        }
        setActionLoading(true);
        try {
            const response = await cancelBookRider(id);
            if (response.success) {
                toast.success('Rider booking canceled successfully.');
                setRiderBooking(response.data.data);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('An error occurred while canceling the rider booking.');
            console.error('Error canceling rider booking:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleComplete = async () => {
        if (!['Accepted', 'In Progress'].includes(riderBooking.status)) {
            toast.error('Only bookings with status "Accepted" or "In Progress" can be completed.');
            return;
        }
        setActionLoading(true);
        try {
            const response = await completeBookRider(id);
            if (response.success) {
                toast.success('Rider booking completed successfully.');
                setRiderBooking(response.data.data);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('An error occurred while completing the rider booking.');
            console.error('Error completing rider booking:', error);
        } finally {
            setActionLoading(false);
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

    if (!riderBooking) {
        return (
            <div className="mt-16 px-5">
                <div className="container">
                    <div className="text-center py-10">
                        Rider booking not found.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-quizzes-right">
            <div className="section-inner">
                <div className="box-2 section-right">
                    <div className="heading-section flex justify-between items-center">
                        <h6 className="fw-5 fs-22 wow fadeInUp">Rider Booking Details</h6>
                        <a href="/rider-bookings" className="tf-btn wow fadeInUp" data-wow-delay="0.1s">
                            Go Back
                            <i className="icon-arrow-top-right"></i>
                        </a>
                    </div>
                    <section className="section-product-top shop-single">
                        <div className="section-image-zoom">
                            <div className="tf-container">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="">
                                            <img
                                                className="tf-image-zoom ls-is-cached lazyloaded"
                                                src={riderBooking.image || 'https://ih1.redbubble.net/image.1861329500.2941/ur,pin_large_front,square,1000x1000.webp'}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="tf-product-infor-wrap position-relative">
                                            <div className="">
                                                <h2 className="product-title font-cardo">
                                                    {riderBooking.package_name}
                                                </h2>
                                                <p className="author">
                                                    <strong>Rider Name: </strong>{riderBooking.rider_name || 'N/A'} <br />
                                                    <strong>Rider Phone Number: </strong>{riderBooking.rider_phone_number || 'N/A'}
                                                </p>
                                                <p className="author">
                                                    <strong>Booking Price: </strong>{riderBooking.booking_price ? `${riderBooking.booking_price} RWF` : 'N/A'} <br />
                                                </p>
                                                <div className="product_meta">
                                                    <p className="author">
                                                        <strong>Pickup Address: </strong>{riderBooking.pickup_address || 'N/A'} <br />
                                                        <strong>Delivery Address: </strong>{riderBooking.delivery_address || 'N/A'} <br />
                                                        <strong>Estimated Distance (km): </strong>{riderBooking.estimated_distance_km || 'N/A'} <br />
                                                        <strong>Estimated Delivery Time: </strong>{riderBooking.estimated_delivery_time || 'N/A'} <br />
                                                        <strong>Status: </strong>{riderBooking.status || 'N/A'} <br />
                                                    </p>
                                                </div>
                                                <div className="description">
                                                    <p className="fs-15">
                                                        {riderBooking.package_description}
                                                    </p>
                                                </div>
                                                <div className="action-buttons mt-4">
                                                    {riderBooking.status === 'Pending' && (
                                                        <button
                                                            className="tf-btn mr-2"
                                                            onClick={handleCancel}
                                                            disabled={actionLoading}
                                                        >
                                                            {actionLoading ? 'Cancelling...' : 'Cancel Booking'}
                                                        </button>
                                                    )}
                                                    {['Accepted', 'In Progress'].includes(riderBooking.status) && (
                                                        <button
                                                            className="tf-btn"
                                                            onClick={handleComplete}
                                                            disabled={actionLoading}
                                                        >
                                                            {actionLoading ? 'Completing...' : 'Complete Booking'}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section-product-bottom">
                        <div className="tf-container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div id="googleMap" style={{ height: "500px", width: "100%" }}></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default GetRiderBookingDetails;
