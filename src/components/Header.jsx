import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
                            <Link
                                className="mobile-nav-toggler mobile-button d-lg-none flex"
                                to="#menu"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleMenu();
                                }}
                            ></Link>
                            <div id="site-logo">
                                <Link to="/" rel="home">
                                    <img id="logo-header" src={Logo} alt="" style={{ width: '80px' }} />
                                </Link>
                            </div>
                        </div>
                        <div className="header-right">
                            <nav className="main-menu">
                                <ul className="navigation">
                                    <li className="current">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="current">
                                        <Link to="/who-we-are">Who We Are</Link>
                                    </li>
                                    <li className="current">
                                        <Link to="/our-services">Our Services</Link>
                                    </li>
                                    <li className="current">
                                        <Link to="/contact-us">Contact Us</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="header-btn">
                                {isLoggedIn ? (
                                    <>
                                        <div className="header-register">
                                            <Link to="/dashboard" className="tf-button-default active header-text">
                                                Dashboard
                                            </Link>
                                        </div>
                                        <div className="header-login">
                                            <Link className="tf-button-default header-text" to='/login'>
                                                Logout
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="header-login">
                                            <Link to="/login" className="tf-button-default header-text">Log In</Link>
                                        </div>
                                        <div className="header-register">
                                            <Link to="/register" className="tf-button-default active header-text">Sign Up</Link>
                                        </div>
                                    </>
                                )}
                                {isLoggedIn ? (
                                    <>
                                        <div className="header-join d-lg-none flex">
                                            <Link to="/dashboard" className="fs-15">Dashboard</Link>
                                        </div>
                                        <div className="header-join d-lg-none flex">
                                            <Link className="fs-15" to='/login'>Logout</Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="header-join d-lg-none flex">
                                            <Link to="/login" className="fs-15">Sign In</Link>
                                        </div>
                                        <div className="header-join d-lg-none flex">
                                            <Link to="/register" className="fs-15">Sign Up</Link>
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
                        <Link
                            className="close"
                            aria-label="Close menu"
                            to="#wrapper"
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
                        </Link>
                        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
                            <li style={{ margin: '20px 0' }}>
                                <Link to="/" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                                    Home
                                </Link>
                            </li>
                            <li style={{ margin: '20px 0' }}>
                                <Link to="/who-we-are" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                                    Who We Are
                                </Link>
                            </li>
                            <li style={{ margin: '20px 0' }}>
                                <Link to="/our-services" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                                    Our Services
                                </Link>
                            </li>
                            <li style={{ margin: '20px 0' }}>
                                <Link to="/contact-us" style={{ color: '#fff', fontSize: '18px', textDecoration: 'none' }}>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>
        </div>
    )
}

export default Header