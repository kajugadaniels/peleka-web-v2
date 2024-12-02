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
        <div className="relative">
            <header id="header_main" className="header type-absolute style-2 style-8 style-9">
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
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="current">
                                        <a href="/who-we-are">Who We Are</a>
                                    </li>
                                    <li className="current">
                                        <a href="/our-product">Our Product</a>
                                    </li>
                                    <li className="current">
                                        <a href="/contact-us">Contact Us</a>
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
                                                Logout
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="header-login">
                                            <a href="/login" className="tf-button-default header-text">Log In</a>
                                        </div>
                                        <div className="header-register">
                                            <a href="/register" className="tf-button-default active header-text">Sign Up</a>
                                        </div>
                                    </>
                                )}
                                {isLoggedIn ? (
                                    <>
                                        <div className="header-join d-lg-none flex">
                                            <a href="/dashboard" className="fs-15">Dashboard</a>
                                        </div>
                                        <div className="header-join d-lg-none flex">
                                            <span className="fs-15" onClick={handleLogout}>Logout</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="header-join d-lg-none flex">
                                            <a href="/login" className="fs-15">Sign In</a>
                                        </div>
                                        <div className="header-join d-lg-none flex">
                                            <a href="/register" className="fs-15">Sign Up</a>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="d-lg-none" id="menu">
                    <a className="close" aria-label="Close menu" href="#wrapper">
                        <i className="flaticon-close-1"></i>
                    </a>
                    <ul>
                        <li>
                            <a href="/">
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="/who-we-are">
                                <span>How We Are</span>
                            </a>
                        </li>
                        <li>
                            <a href="/our-product">
                                <span>Our Product</span>
                            </a>
                        </li>
                        <li>
                            <a href="/contact-us">
                                <span>Contact Us</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header