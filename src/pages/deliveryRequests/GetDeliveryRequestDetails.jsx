import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchDeliveryRequestById } from '../../api'
import { toast } from 'react-toastify'

const GetDeliveryRequestDetails = () => {
    const { id } = useParams();
    const [deliveryRequest, setDeliveryRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pickupCoords, setPickupCoords] = useState(null);
    const [deliveryCoords, setDeliveryCoords] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadDeliveryRequestDetails = async () => {
            try {
                const data = await fetchDeliveryRequestById(id);
                setDeliveryRequest(data);
                setPickupCoords({ lat: parseFloat(data.pickup_lat), lng: parseFloat(data.pickup_lng) });
                setDeliveryCoords({ lat: parseFloat(data.delivery_lat), lng: parseFloat(data.delivery_lng) });
            } catch (error) {
                toast.error('Failed to load delivery request details.');
                navigate('/delivery-requests');
            } finally {
                setLoading(false);
            }
        };
        loadDeliveryRequestDetails();
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

    if (loading) {
        return (
            <div className="mt-16 px-5">
                <div className="container">
                    <div className="text-center py-10">
                        Loading delivery request details...
                    </div>
                </div>
            </div>
        );
    }

    if (!deliveryRequest) {
        return (
            <div className="mt-16 px-5">
                <div className="container">
                    <div className="text-center py-10">
                        Delivery request not found.
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
                        <h6 className="fw-5 fs-22 wow fadeInUp">Delivery Request Details</h6>
                        <a href="/delivery-requests" className="tf-btn wow fadeInUp" data-wow-delay="0.1s">
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
                                            <img className=" tf-image-zoom ls-is-cached lazyloaded" src={deliveryRequest.image || 'https://ih1.redbubble.net/image.1861329500.2941/ur,pin_large_front,square,1000x1000.webp'} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="tf-product-infor-wrap position-relative">
                                            <div className="">
                                                <h2 className="product-title font-cardo">
                                                    {deliveryRequest.package_name}
                                                </h2>
                                                <p className="author">
                                                    <strong>Rider Name: </strong>{deliveryRequest.rider_name || 'N/A'} <br />
                                                    <strong>Rider Phone Number: </strong>{deliveryRequest.rider_phone_number || 'N/A'}
                                                </p>
                                                <p className="author">
                                                    <strong>Recipient Name: </strong>{deliveryRequest.recipient_name} <br />
                                                    <strong>Recipient Phone Number: </strong>{deliveryRequest.recipient_phone}
                                                </p>
                                                <p className="author">
                                                    <strong>Delivery Price: </strong>{deliveryRequest.delivery_price || 'N/A'} <br />
                                                </p>
                                                <div className="product_meta">
                                                    <p className="author">
                                                        <strong>Pickup Address: </strong>{deliveryRequest.pickup_address || 'N/A'} <br />
                                                        <strong>Delivery Address: </strong>{deliveryRequest.delivery_address || 'N/A'} <br />
                                                        <strong>Estimated Distance (km): </strong>{deliveryRequest.estimated_distance_km || 'N/A'} <br />
                                                        <strong>Estimated Delivery Time: </strong>{deliveryRequest.estimated_delivery_time || 'N/A'} <br />
                                                        <strong>Status: </strong>{deliveryRequest.status || 'N/A'} <br />
                                                    </p>
                                                </div>
                                                <div className="description">
                                                    <p className="fs-15">
                                                        {deliveryRequest.package_description}
                                                    </p>
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
    )
}

export default GetDeliveryRequestDetails