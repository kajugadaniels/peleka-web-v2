import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../api';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook to get current location
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('Login first to access this page.');
            navigate('/login');
            return;
        }

        setIsLoggedIn(true);
    }, [navigate]);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('No active session found.');
            return;
        }

        const { success, message } = await logout(token);

        if (success) {
            toast.success(message || 'Logout successful.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } else {
            toast.error(message);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
    };

    const isActive = (paths) => {
        const currentPath = location.pathname;

        return paths.some((path) => {
            if (path.includes(':')) {
                // Handle dynamic paths (e.g., /delivery-request/:id)
                const regex = new RegExp(`^${path.replace(':id', '[^/]+')}$`);
                return regex.test(currentPath);
            }
            return currentPath === path;
        })
            ? 'active'
            : '';
    };

    return (
        <div className="dashboard_navigationbar">
            <div
                className={`dropbtn ${isDropdownVisible ? 'show' : ''}`}
                onClick={toggleDropdown}
            >
                <i className="icon-home"></i>
                Dashboard Navigation
            </div>
            <div
                className={`instructors-dashboard ${isDropdownVisible ? 'show' : ''}`}
            >
                <div className="dashboard-title">CLIENT DASHBOARD</div>
                <Link className={`dashboard-item ${isActive(['/dashboard'])}`} to="/dashboard">
                    <i className="flaticon-activity"></i>
                    Dashboard
                </Link>
                <Link
                    className={`dashboard-item ${isActive([
                        '/delivery-requests',
                        '/delivery-request/add',
                        '/delivery-request/:id',
                    ])}`}
                    to="/delivery-requests"
                >
                    <i className="flaticon-bag"></i>
                    Delivery Requests
                </Link>
                <Link
                    className={`dashboard-item ${isActive([
                        '/rider-bookings',
                        '/rider-booking/add',
                        '/rider-booking/:id',
                    ])}`}
                    to="/rider-bookings"
                >
                    <i className="flaticon-calendar"></i>
                    Book a Rider
                </Link>
                <Link className={`dashboard-item ${isActive(['/settings'])}`} to="/profile">
                    <i className="flaticon-setting-1"></i>
                    Settings
                </Link>
                <Link className="dashboard-item" onClick={handleLogout}>
                    <i className="flaticon-export"></i>
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
