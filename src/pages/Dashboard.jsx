import React, { useEffect, useState, useRef } from 'react';
import { fetchDeliveryRequests } from '../api';
import { toast } from 'react-toastify';
import Chart from 'chart.js/auto';

const Dashboard = () => {
    const [deliveryRequests, setDeliveryRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        pending: 0,
        inProgress: 0,
        completed: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchDeliveryRequests();
                setDeliveryRequests(data);

                // Calculate stats
                const pending = data.filter((req) => req.status === 'Pending').length;
                const inProgress = data.filter((req) => req.status === 'In Progress').length;
                const completed = data.filter((req) => req.status === 'Completed').length;
                const totalRevenue = data
                    .filter((req) => req.status === 'Completed')
                    .reduce((sum, req) => sum + parseFloat(req.delivery_price || 0), 0);

                setStats({ pending, inProgress, completed, totalRevenue });
            } catch (error) {
                toast.error('Failed to fetch delivery requests.');
                console.error('Error fetching delivery requests:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleView = (requestId) => {
        navigate(`/delivery-request/${requestId}`);
    };

    const recentRequests = deliveryRequests.slice(0, 5);

    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Delivery Dashboard</h2>
            {loading ? (
                <div>Loading analytics...</div>
            ) : (
                <>
                    <div className="section-dashboard-right">
                        <div className="section-icons">
                            <div className="row">
                                <div className="icons-items">
                                    <div className="icons-box style-4 wow fadeInUp">
                                        <div className="icons">
                                            <i className="flaticon-play-2"></i>
                                        </div>
                                        <div className="content">
                                            <h6>
                                                Pending
                                            </h6>
                                            <span className="num-count fs-26 fw-5">
                                                {stats.pending}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="icons-box style-4 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="icons">
                                            <i className="flaticon-alarm"></i>
                                        </div>
                                        <div className="content">
                                            <h6>
                                                In Progress
                                            </h6>
                                            <span className="num-count fs-26 fw-5">
                                                {stats.inProgress}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="icons-box style-4 wow fadeInUp" data-wow-delay="0.2s">
                                        <div className="icons">
                                            <i className="flaticon-video"></i>
                                        </div>
                                        <div className="content">
                                            <h6>
                                                Completed
                                            </h6>
                                            <span className="num-count fs-26 fw-5">
                                                {stats.completed}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section-learn">
                        <div className="heading-section flex justify-between items-center">
                            <h6 className="fw-5 fs-22 wow fadeInUp">
                                Recent Delivery Requests
                            </h6>
                            <a href="delivery-requests" className="tf-btn-arrow wow fadeInUp" data-wow-delay="0.1s">
                                View All
                                <i className="icon-arrow-top-right"></i>
                            </a>
                        </div>
                        <div className="wg-box">
                            <div className="table-selling-course wow fadeInUp">
                                <ul>
                                    {recentRequests.map((req) => (
                                        <li>
                                            <div className="selling-course-item item my-20 ptable-20 border-bottom">
                                                <div className="image">
                                                    <img className="lazyload"
                                                        src={(req.image) || 'https://ih1.redbubble.net/image.1861329500.2941/ur,pin_large_front,square,1000x1000.webp'}
                                                        data-src={(req.image) || 'https://ih1.redbubble.net/image.1861329500.2941/ur,pin_large_front,square,1000x1000.webp'}
                                                        alt={req.package_name || 'N/A'}
                                                        onClick={() => handleView(req.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                                <div className="title">
                                                    <span
                                                        className="fs-15 fw-5"
                                                        onClick={() => handleView(req.id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {req.package_name || 'N/A'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="fs-15 fw-5">
                                                        {req.status || 'N/A'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="fs-15 fw-5">
                                                        {req.delivery_price || 'N/A'} RWF
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="fs-15 fw-5">
                                                        {(req.rider_name) || 'Not Yet Assigned'}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
