import React from 'react'
import { WhoWeAre2 } from '../../assets/img'

const Register = () => {
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
                                    Create A New Account
                                </h2>
                                <div className="register">
                                    <p className="fw-5 fs-15 wow fadeInUp" data-wow-delay="0s">
                                        Already have an account?
                                    </p>
                                    <a href="/login" className="fw-5 fs-15 wow fadeInUp" data-wow-delay="0s">
                                        Login
                                    </a>
                                </div>
                                <form action="#" className="form-login">
                                    <div className="cols">
                                        <fieldset className="tf-field field-username wow fadeInUp" data-wow-delay="0s">
                                            <input className="tf-input style-1" type="text" required />
                                            <label className="tf-field-label fs-15" for="field1">Name</label>
                                        </fieldset>
                                    </div>
                                    <div className='d-flex'>
                                        <div className="cols px-2">
                                            <fieldset className="tf-field field-username wow fadeInUp" data-wow-delay="0s">
                                                <input className="tf-input style-1" type="number" required />
                                                <label className="tf-field-label fs-15" for="field1">Phone Number</label>
                                            </fieldset>
                                        </div>
                                        <div className="cols px-2">
                                            <fieldset className="tf-field field-username wow fadeInUp" data-wow-delay="0s">
                                                <input className="tf-input style-1" type="email" required />
                                                <label className="tf-field-label fs-15" for="field1">Email Address</label>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className="cols px-2">
                                            <fieldset className="tf-field field-pass wow fadeInUp" data-wow-delay="0s">
                                                <input className="tf-input style-1" type="password" required />
                                                <label className="tf-field-label fs-15" for="field2">Password</label>
                                            </fieldset>
                                        </div>
                                        <div className="cols px-2">
                                            <fieldset className="tf-field field-pass wow fadeInUp" data-wow-delay="0s">
                                                <input className="tf-input style-1" type="password" required />
                                                <label className="tf-field-label fs-15" for="field2">Confirm Password</label>
                                            </fieldset>
                                        </div>
                                    </div>

                                    <button className=" button-submit tf-btn w-100 wow fadeInUp mt-5" data-wow-delay="0s" type="submit">
                                        Sign Up
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
    )
}

export default Register