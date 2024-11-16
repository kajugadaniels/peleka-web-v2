import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchDeliveryRequests } from '../../api';

const GetDeliveryRequests = () => {
    const navigate = useNavigate();
    const [deliveryRequests, setDeliveryRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('Newest');
    const [visibleItems, setVisibleItems] = useState(5);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchDeliveryRequests();
                setDeliveryRequests(data);
            } catch (error) {
                toast.error('Failed to fetch delivery requests.');
                console.error('Error fetching delivery requests:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleView = (requestId) => {
        navigate(`/delivery-request/${requestId}`);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + 5);
    };

    const filteredRequests = deliveryRequests
        .filter((request) => {
            const matchesSearchTerm = (
                (request.package_name?.toLowerCase() || '').includes(searchTerm) ||
                (request.client_name?.toLowerCase() || '').includes(searchTerm) ||
                (request.recipient_name?.toLowerCase() || '').includes(searchTerm) ||
                (request.status?.toLowerCase() || '').includes(searchTerm)
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
                        <h6 className="fw-5 fs-22 wow fadeInUp">Delivery Requests</h6>
                        <a href="/delivery-request/add" className="tf-btn wow fadeInUp" data-wow-delay="0.1s">
                            Send New Request
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
                                    <div className="fs-15 fw-5">Delivery Price</div>
                                </div>
                            </div>
                            <ul>
                                {loading ? (
                                    <div className="loading-spinner">Loading...</div>
                                ) : (
                                    filteredRequests.map((request) => (
                                        <li key={request.id}>
                                            <div className="box-2-item item border-bottom wow fadeInUp">
                                                <div className="image">
                                                    <img src={(request.image) || 'https://ih1.redbubble.net/image.1861329500.2941/ur,pin_large_front,square,1000x1000.webp'} data-src={(request.image) || 'https://ih1.redbubble.net/image.1861329500.2941/ur,pin_large_front,square,1000x1000.webp'} alt="" onClick={() => handleView(request.id)} />
                                                </div>
                                                <div className="title">
                                                    <p className="fs-15 fw-5" onClick={() => handleView(request.id)}>
                                                        {(request.package_name) || 'N/A'}
                                                    </p>
                                                    <div>
                                                        <span>
                                                            <strong>Distance:</strong> {(request.estimated_distance_km) || 'N/A'} KM
                                                        </span>
                                                        <br />
                                                        <span>
                                                            <strong>Time:</strong> {(request.estimated_delivery_time) || 'N/A'} Minutes
                                                        </span>
                                                        <br />
                                                        <span>
                                                            <strong>Status:</strong> {(request.status) || 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="fs-15 fw-5">
                                                        {(request.rider_name) || 'Not Yet Assigned'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="fs-15 fw-5">
                                                        {(request.recipient_name) || 'N/A'} ({(request.recipient_phone) || 'N/A'})
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="fs-15 fw-5">
                                                        {(request.delivery_price) || 'N/A'} RWF
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                    {!loading && visibleItems < deliveryRequests.length && (
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

export default GetDeliveryRequests;
