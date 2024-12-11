import React from 'react'
import { LogoWhite } from '../assets/img'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="footer" className="footer style-2">
            <div className="footer-wrap">
                <div className="footer-body">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="footer-body-wrap flex justify-between">
                                    <div className="footer-more-infor wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="footer-logo">
                                            <a href="/">
                                                <img className="lazyload" src={LogoWhite} alt="Peleka Logo" style={{ width: '100px' }} />
                                            </a>
                                        </div>
                                        <ul className="address">
                                            <li className="flex gap-10 items-center">
                                                <div className="icon">
                                                    <i className="flaticon-call"></i>
                                                </div>
                                                <p>+250 783 706 464</p>
                                            </li>
                                            <li className="flex gap-10 items-center">
                                                <div className="icon">
                                                    <i className="flaticon-mail-1"></i>
                                                </div>
                                                <p>info@peleka.com</p>
                                            </li>
                                            <li className="flex gap-10 items-center">
                                                <div className="icon">
                                                    <i className="flaticon-location"></i>
                                                </div>
                                                <p>Kigali, Rwanda</p>
                                            </li>
                                        </ul>
                                        <ul className="tf-social-icon flex items-center gap-10">
                                            <li>
                                                <a href="https://x.com/PelekaLtd" target='_blank'>
                                                    <i className="icon-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.instagram.com/peleka_ltd/" target='_blank'>
                                                    <i className="flaticon-instagram"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="footer-menu-list wow fadeInUp" data-wow-delay="0.2s">
                                        <h5 className="fw-5">Company</h5>
                                        <ul>
                                            <li>
                                                <a href="/who-we-are">About</a>
                                            </li>
                                            <li>
                                                <a href="/services">Our Services</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="footer-menu-list wow fadeInUp" data-wow-delay="0.3s">
                                        <h5 className="fw-5">Useful Links</h5>
                                        <ul>
                                            <li>
                                                <a href="/faqs">FAQs</a>
                                            </li>
                                            <li>
                                                <a href="/help-center">Help Center</a>
                                            </li>
                                            <li>
                                                <a href="/terms-and-conditions">Terms & Conditions</a>
                                            </li>
                                            <li>
                                                <a href="/privacy-policy">Privacy Policy</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="footer-menu-list wow fadeInUp" data-wow-delay="0.4s">
                                        <h5 className="fw-5">Join Our Community</h5>
                                        <ul>
                                            <li>
                                                <a href="/register">Join Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="footer-subscribe wow fadeInUp" data-wow-delay="0.5s">
                                        <h5 className="fw-5">Subscribe</h5>
                                        <p>
                                            Join 2,000+ others for updates, offers, and the latest from our newsletter. Subscribe now!
                                        </p>
                                        <form className="form-subscribe style-line-bottom">
                                            <fieldset className="email">
                                                <input type="email" placeholder="Your e-mail" className="style-default" name="email" required />
                                            </fieldset>
                                            <div className="button-submit">
                                                <button className="tf-btn-arrow" type="submit">
                                                    Send <i className="icon-arrow-top-right"></i>
                                                </button>
                                            </div>
                                        </form>
                                        <h5 className="fw-5 get-app">
                                            Get the app
                                        </h5>
                                        <ul className="tf-app-download">
                                            {/*
                                            <li>
                                                <a href="#">
                                                    <div className="icon">
                                                        <i className="icon-apple"></i>
                                                    </div>
                                                    <div className="app">
                                                        <div>
                                                            Download on the
                                                        </div>
                                                        <div>
                                                            Apple Store
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            */}
                                            <li>
                                                <a href="#">
                                                    <div className="icon">
                                                        <i className="icon-chplay"></i>
                                                    </div>
                                                    <div className="app">
                                                        <div>Get in on</div>
                                                        <div>
                                                            Google Play
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom wow fadeInUp">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="footer-bottom-wrap flex justify-center items-center">
                                    <p>©{currentYear} Peleka LTD. Developed by <a href='https://www.nexcodes.dev/' target='_blank'>NE<span style={{ color: 'red', fontWeight: 'bold' }}>X</span>CODE</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
