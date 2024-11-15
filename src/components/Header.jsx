import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Logo } from '../assets/img'
import { logout } from '../api'

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

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

    return (
        <header id="header_main" className="header style-2">
            <div className="header-inner">
                <div className="header-inner-wrap">
                    <div className="header-left flex-grow">
                        <a className="mobile-nav-toggler mobile-button d-lg-none flex" href="#menu"></a>
                        <div id="site-logo">
                            <a href="/" rel="home">
                                <img id="logo-header" src={Logo} alt="" style={{ width: '80px' }} />
                            </a>
                        </div>
                    </div>
                    <div className="header-right">
                        <nav className="main-menu">
                            <ul className="navigation">
                                <li className="current">
                                    <a href="/">
                                        Home
                                    </a>
                                </li>
                                <li className="current">
                                    <a href="/who-we-are">
                                        Who We Are
                                    </a>
                                </li>
                                <li className="current">
                                    <a href="/our-product">
                                        Our Product
                                    </a>
                                </li>
                                <li className="current">
                                    <a href="/contact-us">
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="header-btn">
                            {isLoggedIn ? (
                                <>
                                    <div className="header-register">
                                        <a href="/dashboard" className="tf-button-default active header-text">
                                            Dashboard
                                        </a>
                                    </div>
                                    <div className="header-login">
                                        <span className="tf-button-default header-text" onClick={handleLogout}>
                                            Log Out
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="header-login">
                                        <a href="/login" className="tf-button-default header-text">
                                            Log In
                                        </a>
                                    </div>
                                    <div className="header-register">
                                        <a href="/dashboard" className="tf-button-default active header-text">
                                            Register
                                        </a>
                                    </div>
                                </>
                            )}
                            <div className="header-join d-lg-none flex">
                                <a href="/login" className="fs-15">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="d-lg-none" id="menu">
                <a className="close" aria-label="Close menu" href="#wrapper">
                    <i className="flaticon-close-1"></i>
                </a>
                <ul>
                    <li className="current">
                        <a href="/">
                            <span>Home</span>
                        </a>
                    </li>
                    <li className="">
                        <a href="/who-we-are">
                            <span>Who We Are</span>
                        </a>
                    </li>
                    <li className="">
                        <a href="/our-product">
                            <span>Our Products</span>
                        </a>
                    </li>
                    <li className="">
                        <a href="/contact-us">
                            <span>Contact</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header