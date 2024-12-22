import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../api';
import { WhoWeAre1 } from '../../assets/img';
import validator from 'validator';

const Login = () => {
    const [email_or_phone, setEmailOrPhone] = useState('');
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
        if (!email_or_phone.trim()) {
            toast.error('Please enter your email or phone number.');
            return false;
        }

        if (!password) {
            toast.error('Please enter your password.');
            return false;
        }

        if (email_or_phone.includes('@')) {
            // Validate as email
            if (!validator.isEmail(email_or_phone)) {
                toast.error('Please enter a valid email address.');
                return false;
            }
        } else {
            // Validate as phone number (simple international format)
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            if (!phoneRegex.test(email_or_phone)) {
                toast.error('Please enter a valid phone number.');
                return false;
            }
        }

        // Removed password length validation to allow passwords of any length
        /*
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return false;
        }
        */

        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            // Construct payload with 'email_or_phone' and 'password'
            const payload = {
                email_or_phone: email_or_phone.trim(),
                password: password,
            };

            const { success, data, message } = await login(payload);

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
        <div className="main-content page-login">
            <section className="section-page-login login-wrap tf-spacing-4">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="img-left wow fadeInLeft" data-wow-delay="0s">
                                <img className="ls-is-cached lazyloaded" data-src={WhoWeAre1} src={WhoWeAre1} alt="" />
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
                            <div className="content-right">
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
                                                type="text"
                                                placeholder="Enter your email or phone number"
                                                value={email_or_phone}
                                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                                required
                                            />
                                            <label className="tf-field-label fs-15">
                                                Email or Phone Number
                                            </label>
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
                                            <label className="tf-field-label fs-15">
                                                Password
                                            </label>
                                        </fieldset>
                                    </div>
                                    <div className="checkbox-item">
                                        <label className="wow fadeInUp" data-wow-delay="0s">
                                            <p className="fs-15">Remember me</p>
                                            <input type="checkbox" />
                                            <span className="btn-checkbox"></span>
                                        </label>
                                        <a href="/forget-password" className="fs-15 wow fadeInUp" data-wow-delay="0.1s">
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
