// src/pages/riderBookings/GetRiderBookings.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { listBookRiders } from '../../api';

const GetRiderBookings = () => {
    const navigate = useNavigate();
    const [riderBookings, setRiderBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('Newest');
    const [visibleItems, setVisibleItems] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await listBookRiders();
                setRiderBookings(data);
            } catch (error) {
                toast.error('Failed to fetch rider bookings.');
                console.error('Error fetching rider bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleView = (bookingId) => {
        navigate(`/rider-booking/${bookingId}`);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + 5);
    };

    const filteredBookings = riderBookings
        .filter((booking) => {
            const matchesSearchTerm = (
                (booking.package_name?.toLowerCase() || '').includes(searchTerm) ||
                (booking.client_name?.toLowerCase() || '').includes(searchTerm) ||
                (booking.recipient_name?.toLowerCase() || '').includes(searchTerm) ||
                (booking.status?.toLowerCase() || '').includes(searchTerm)
            );
            return matchesSearchTerm;
        })
        .sort((a, b) => {
            if (sortOption === 'Newest') {
                return new Date(b.created_at) - new Date(a.created_at);
            }
            if (sortOption === 'Oldest') {
                return new Date(a.created_at) - new Date(b.created_at);
            }
            return 0;
        })
        .slice(0, visibleItems);

    return (
        <div className="section-quizzes-right">
            <div className="section-inner">
                <div className="box-2 section-right">
                    <div className="heading-section flex justify-between items-center">
                        <h6 className="fw-5 fs-22 wow fadeInUp">Rider Bookings</h6>
                        <a href="/rider-booking/add" className="tf-btn wow fadeInUp" data-wow-delay="0.1s">
                            Send New Booking
                            <i className="icon-arrow-top-right"></i>
                        </a>
                    </div>
                    <div className="filter pd-40">
                        <div className="header-search flex-grow wow fadeInUp">
                            <form action="#" className="form-search">
                                <fieldset>
                                    <input
                                        className=""
                                        type="text"
                                        placeholder="Search for anything"
                                        name="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        aria-required="true"
                                        required
                                    />
                                </fieldset>
                                <div className="button-submit">
                                    <button className="" type="submit">
                                        <i className="icon-search fs-20"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="sort-by-wrap wow fadeInUp" data-wow-delay="0.1s">
                            <div className="sort-wrap">
                                <p className="text text-2">Sort by</p>
                                <select
                                    className="nice-select default"
                                    value={sortOption}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                >
                                    <option value="Newest">Newest</option>
                                    <option value="Oldest">Oldest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="wg-box">
                        <div className="table-box-2">
                            <div className="head wow fadeInUp">
                                <div className="item">
                                    <div className="fs-15 fw-5">Package</div>
                                </div>
                                <div className="item">
                                    <div className="fs-15 fw-5">Rider Name</div>
                                </div>
                                <div className="item">
                                    <div className="fs-15 fw-5">Recipient</div>
                                </div>
                                <div className="item">
                                    <div className="fs-15 fw-5">Price</div>
                                </div>
                            </div>
                            <ul>
                                {loading ? (
                                    <div className="loading-spinner">Loading...</div>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <li key={booking.id}>
                                            <div className="box-2-item item border-bottom wow fadeInUp">
                                                <div className="image">
                                                    <img
                                                        src={booking.image || 'https://ih1.redbubble.net/image.1861329500.2941/ur,pin_large_front,square,1000x1000.webp'}
                                                        data-src={booking.image || 'https://ih1.redbubble.net/image.1861329500.2941/ur,pin_large_front,square,1000x1000.webp'}
                                                        alt=""
                                                        onClick={() => handleView(booking.id)}
                                                    />
                                                </div>
                                                <div className="title">
                                                    <p className="fs-15 fw-5" onClick={() => handleView(booking.id)}>
                                                        {booking.client_name || 'N/A'}
                                                    </p>
                                                    <div>
                                                        <span>
                                                            <strong>Distance:</strong> {booking.estimated_distance_km || 'N/A'} KM
                                                        </span>
                                                        <br />
                                                        <span>
                                                            <strong>Time:</strong> {booking.estimated_delivery_time || 'N/A'}
                                                        </span>
                                                        <br />
                                                        <span>
                                                            <strong>Status:</strong> {booking.status || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="fs-15 fw-5">
                                                        {booking.rider_name || 'Not Yet Assigned'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="fs-15 fw-5">
                                                        {booking.recipient_name || 'N/A'} ({booking.recipient_phone || 'N/A'})
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="fs-15 fw-5">
                                                        {booking.booking_price ? `${booking.booking_price} RWF` : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                    {!loading && visibleItems < riderBookings.length && (
                        <div className="load-more-container">
                            <button className="tf-btn wow fadeInUp" onClick={handleLoadMore}>
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetRiderBookings;