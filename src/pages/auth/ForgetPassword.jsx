import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { passwordReset } from '../../api'
import { toast } from 'react-toastify'
import { WhoWeAre1 } from '../../assets/img';

const ForgetPassword = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmailOrPhone = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
        if (!value) {
            return 'Email or phone number is required.';
        }
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
            return 'Enter a valid email address or phone number.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateEmailOrPhone(emailOrPhone);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setLoading(true);
        const { success, message } = await passwordReset(emailOrPhone);
        setLoading(false);

        if (success) {
            toast.success(message);
            localStorage.setItem('passwordResetEmailOrPhone', emailOrPhone);
            navigate('/password-reset-confirm');
        } else {
            toast.error(message);
            localStorage.removeItem('passwordResetEmailOrPhone');
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
                                    Forget Password
                                </h2>
                                <div className="register">
                                    <p className="fw-5 fs-15 wow fadeInUp" data-wow-delay="0s">
                                        Enter your email or phone number to receive an OTP for password reset.
                                    </p>
                                </div>
                                <form className="form-login" onSubmit={handleSubmit}>
                                    <div className="cols">
                                        <fieldset className="tf-field field-username wow fadeInUp" data-wow-delay="0s">
                                            <input
                                                className="tf-input style-1"
                                                type="text"
                                                placeholder="Enter your email address or phone number"
                                                value={emailOrPhone}
                                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                                required
                                            />
                                            <label className="tf-field-label fs-15" htmlFor="field1">Email Address or Phone Number</label>
                                        </fieldset>
                                    </div>

                                    <button
                                        className="button-submit tf-btn w-100 wow fadeInUp"
                                        data-wow-delay="0s"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Send OTP'}
                                        <i className="icon-arrow-top-right"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgetPassword