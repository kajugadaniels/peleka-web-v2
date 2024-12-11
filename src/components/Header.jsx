import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Logo } from '../assets/img'
import { logout } from '../api'

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative" style={{ paddingBottom: '100px' }}>
            <header id="header_main" className="header type-absolute style-2 style-8 style-9">
                <div className="header-inner">
                    <div className="header-inner-wrap">
                        <div className="header-left flex-grow">
                            <a
                                className="mobile-nav-toggler mobile-button d-lg-none flex"
                                href="#menu"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleMenu();
                                }}
                            ></a>
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
                                        <a href="/our-services">Our Services</a>
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
                {isMenuOpen && (
                    <nav
                        className="d-lg-none"
                        id="menu"
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100vh',
                            backgroundColor: '#333',
                            color: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                        }}
                    >
                        <a
                            className="close"
                            aria-label="Close menu"
                            href="#wrapper"
                            onClick={(e) => {
                                e.preventDefault();
                                toggleMenu();
                            }}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                fontSize: '30px',
                                cursor: 'pointer',
                                color: '#fff',
                            }}
                        >
                            <i className="flaticon-close-1"></i>
                        </a>
                        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
                            <li style={{ margin: '20px 0' }}>
                                <a href="/" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                                    Home
                                </a>
                            </li>
                            <li style={{ margin: '20px 0' }}>
                                <a href="/who-we-are" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                                    Who We Are
                                </a>
                            </li>
                            <li style={{ margin: '20px 0' }}>
                                <a href="/our-services" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                                    Our Services
                                </a>
                            </li>
                            <li style={{ margin: '20px 0' }}>
                                <a href="/contact-us" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>
        </div>
    )
}

export default Header