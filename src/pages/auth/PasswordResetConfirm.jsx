import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { passwordResetConfirm } from '../../api'
import { toast } from 'react-toastify'
import { WhoWeAre2 } from '../../assets/img';

const PasswordResetConfirm = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmailOrPhone = localStorage.getItem('passwordResetEmailOrPhone');
        if (storedEmailOrPhone) {
            setEmailOrPhone(storedEmailOrPhone);
        } else {
            toast.error('Not allowed to visit this page.');
            navigate('/');
        }
    }, [navigate]);

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
        if (!emailOrPhone) {
            return 'Email or phone number is required.';
        }
        if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
            return 'Enter a valid email address or phone number.';
        }
        if (!otp) {
            return 'OTP is required.';
        }
        if (!/^\d{7}$/.test(otp)) {
            return 'OTP must be a 7-digit number.';
        }
        if (!newPassword) {
            return 'New password is required.';
        }
        if (newPassword.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (newPassword !== confirmPassword) {
            return 'Passwords do not match.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateInputs();
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setLoading(true);
        const { success, message } = await passwordResetConfirm(emailOrPhone, otp, newPassword);
        setLoading(false);

        if (success) {
            toast.success(message);
            localStorage.removeItem('passwordResetEmailOrPhone');
            navigate('/login');
        } else {
            toast.error(message);
            localStorage.removeItem('passwordResetEmailOrPhone');
            navigate('/forget-password');
        }
    };

    return (
        <div className="main-content page-login ">
            <section className="section-page-login login-wrap tf-spacing-4">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="img-left wow fadeInLeft" data-wow-delay="0s">
                                <img className=" ls-is-cached lazyloaded" data-src={WhoWeAre2} src={WhoWeAre2} alt="" />
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
                                    Reset Password
                                </h2>
                                <div className="register">
                                    <p className="fw-5 fs-15 wow fadeInUp" data-wow-delay="0s">
                                        Enter the OTP sent to your email or phone number and set a new password.
                                    </p>
                                </div>
                                <form className="form-login" onSubmit={handleSubmit}>
                                    <div className="cols px-2">
                                        <fieldset className="tf-field field-username wow fadeInUp" data-wow-delay="0s">
                                            <input
                                                className="tf-input style-1"
                                                type="text"
                                                value={emailOrPhone}
                                                readOnly
                                            />
                                            <label className="tf-field-label fs-15" htmlFor="field1">Email or Phone Number</label>
                                        </fieldset>
                                    </div>
                                    <div className="cols px-2">
                                        <fieldset className="tf-field field-username wow fadeInUp" data-wow-delay="0s">
                                            <input
                                                className="tf-input style-1"
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                            />
                                            <label className="tf-field-label fs-15" htmlFor="field1">OTP</label>
                                        </fieldset>
                                    </div>
                                    <div className="cols px-2">
                                        <fieldset className="tf-field field-pass wow fadeInUp" data-wow-delay="0s">
                                            <input
                                                className="tf-input style-1"
                                                type="password"
                                                name="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                            />
                                            <label className="tf-field-label fs-15" htmlFor="field2">New Password</label>
                                        </fieldset>
                                    </div>
                                    <div className="cols px-2">
                                        <fieldset className="tf-field field-pass wow fadeInUp" data-wow-delay="0s">
                                            <input
                                                className="tf-input style-1"
                                                type="password"
                                                name="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            <label className="tf-field-label fs-15" htmlFor="field2">Confirm New Password</label>
                                        </fieldset>
                                    </div>

                                    <button
                                        className="button-submit tf-btn w-100 wow fadeInUp mt-5"
                                        data-wow-delay="0s"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Resetting...' : 'Reset Password'}
                                        <i className="icon-arrow-top-right"></i>
                                    </button>
                                </form>
                                <div className="register">
                                    <p className="fw-5 fs-15 wow fadeInUp" data-wow-delay="0s">
                                        Back to 
                                    </p>
                                    <a href="/login" className="fw-5 fs-15 wow fadeInUp" data-wow-delay="0s">
                                        Login
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PasswordResetConfirm