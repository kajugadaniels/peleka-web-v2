import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../api';
import { WhoWeAre1 } from '../../assets/img';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.info('You have been logged out.');
        }
    }, []);

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            toast.error('Email is required.');
            return false;
        }

        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }

        if (!password) {
            toast.error('Password is required.');
            return false;
        }

        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return false;
        }

        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const { success, data, message } = await login(email, password);

            if (success) {
                toast.success('Login successful! Redirecting to your profile...');
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/';
            } else {
                toast.error(message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            toast.error('An error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content page-login ">
            <section className="section-page-login login-wrap tf-spacing-4">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="img-left wow fadeInLeft" data-wow-delay="0s">
                                <img className=" ls-is-cached lazyloaded" data-src={WhoWeAre1} src={WhoWeAre1} alt="" />
                                <div className="blockquite wow fadeInLeft" data-wow-delay="0.1s">
                                    <p>
                                        Don't deliver a product <br /> Deliver an experience!
                                    </p>
                                    <p className="author">B. Jeff</p>
                                    <p className="sub-author">Founder &amp; CEO</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="content-right ">
                                <h2 className="login-title fw-7 wow fadeInUp" data-wow-delay="0s">
                                    Sign In To Your Account
                                </h2>
                                <div className="register">
                                    <p className="fw-5 fs-15 wow fadeInUp" data-wow-delay="0s">
                                        Don’t have an account?
                                    </p>
                                    <a href="/register" className="fw-5 fs-15 wow fadeInUp" data-wow-delay="0s">
                                        Join here
                                    </a>
                                </div>
                                <form className="form-login" onSubmit={handleLogin}>
                                    <div className="cols">
                                        <fieldset className="tf-field field-username wow fadeInUp" data-wow-delay="0s">
                                            <input
                                                className="tf-input style-1"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <label className="tf-field-label fs-15" htmlFor="field1">Email</label>
                                        </fieldset>
                                    </div>
                                    <div className="cols">
                                        <fieldset className="tf-field field-pass wow fadeInUp" data-wow-delay="0s">
                                            <input
                                                className="tf-input style-1"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <label className="tf-field-label fs-15" htmlFor="field2">Password</label>
                                        </fieldset>
                                    </div>
                                    <div className="checkbox-item">
                                        <label className="wow fadeInUp" data-wow-delay="0s">
                                            <p className="fs-15">Remember me</p>
                                            <input type="checkbox" />
                                            <span className="btn-checkbox"></span>
                                        </label>
                                        <a href="/" className="fs-15 wow fadeInUp" data-wow-delay="0.1s">
                                            Forgot your password?
                                        </a>
                                    </div>

                                    <button
                                        className="button-submit tf-btn w-100 wow fadeInUp"
                                        data-wow-delay="0s"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging In...' : 'Log In'}
                                        <i className="icon-arrow-top-right"></i>
                                    </button>
                                </form>
                                <p className="fs-15 wow fadeInUp" data-wow-delay="0s">OR</p>
                                <ul className="login-social">
                                    <li className="login-social-icon">
                                        <a href="#" className="tf-btn wow fadeInUp" data-wow-delay="0s">
                                            <i className="flaticon-facebook-1"></i>
                                            Facebook
                                        </a>
                                    </li>
                                    <li className="login-social-icon">
                                        <a href="#" className="tf-btn wow fadeInUp" data-wow-delay="0.1s">
                                            <i className="icon-google"></i>
                                            Google
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;