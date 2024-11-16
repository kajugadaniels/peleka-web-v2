import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../api';

const Sidebar = () => {
    const navigate = useNavigate();
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
                <a className="dashboard-item active" href="/dashboard">
                    <i className="flaticon-activity"></i>
                    Dashboard
                </a>
                <a className="dashboard-item" href="#">
                    <i className="flaticon-setting-1"></i>
                    Settings
                </a>
                <a className="dashboard-item" onClick={handleLogout}>
                    <i className="flaticon-export"></i>
                    Logout
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
