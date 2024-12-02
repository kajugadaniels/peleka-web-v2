import React from 'react'
import { Image1, Image2 } from '../assets/img'

const Hero = () => {
    return (
        <div className="page-title-home9">
            <div className="swiper-container slider-home9">
                <div className="swiper-wrapper">
                    <div className="swiper-slide" data-year="Start Now">
                        <div className="image">
                            <img src={Image2} alt="" />
                        </div>
                        <div className="tf-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="content">
                                        <div>
                                            <div className="widget box-sub-tag fade-item fade-item-1 ">
                                                <div className="sub-tag-icon">
                                                    <i className="icon-flash"></i>
                                                </div>
                                                <div className="sub-tag-title">
                                                    <p>The Leader in Online Courier Delivery</p>
                                                </div>
                                            </div>
                                            <h1 className="fade-item fade-item-1 fw-7 ">
                                                Peleka: Kigali’s <br />Quickest Rides & Deliveries
                                            </h1>
                                            <div className="bottom-btns fade-item fade-item-1">
                                                <a href="#" className="tf-btn style-secondary">
                                                    Learn More About Us
                                                    <i className="icon-arrow-top-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="widget-video">
                                            <a href="#" className="popup-youtube">
                                                <i className="flaticon-play fs-18"></i>
                                            </a>
                                            <h6 className="mb-0">Watch Demo</h6>
                                        </div>
                                    </div>
                                    <div className="bot-wrap"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide" data-year="Fast Courier Service">
                        <div className="image">
                            <img src="images/page-title/page-title-home91.jpg" alt="" />
                        </div>
                        <div className="tf-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="content">
                                        <div>
                                            <div className="widget box-sub-tag fade-item fade-item-1">
                                                <div className="sub-tag-icon">
                                                    <i className="icon-flash"></i>
                                                </div>
                                                <div className="sub-tag-title">
                                                    <p>The Leader in Online Courier Delivery</p>
                                                </div>
                                            </div>
                                            <h1 className="fw-7 fade-item fade-item-2">
                                                Peleka: Kigali’s <br />Quickest Rides & Deliveries
                                            </h1>
                                            <div className="bottom-btns fade-item fade-item-3">
                                                <a href="#" className="tf-btn style-secondary">
                                                    Learn More About Us
                                                    <i className="icon-arrow-top-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="widget-video">
                                            <a href="#" className="popup-youtube">
                                                <i className="flaticon-play fs-18"></i>
                                            </a>
                                            <h6 className="mb-0">Watch Demo</h6>
                                        </div>
                                    </div>
                                    <div className="bot-wrap"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide" data-year="Rider Booking">
                        <div className="image">
                            <img src={Image1} alt="" />
                        </div>
                        <div className="tf-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="content">
                                        <div>
                                            <div className="widget box-sub-tag fade-item fade-item-1">
                                                <div className="sub-tag-icon">
                                                    <i className="icon-flash"></i>
                                                </div>
                                                <div className="sub-tag-title">
                                                    <p>The Leader in Online Courier Delivery</p>
                                                </div>
                                            </div>
                                            <h1 className="fw-7 fade-item fade-item-2">
                                                Peleka: Kigali’s <br />Quickest Rides & Deliveries
                                            </h1>
                                            <div className="bottom-btns fade-item fade-item-3">
                                                <a href="/who-we-are" className="tf-btn style-secondary">
                                                    Learn More About Us
                                                    <i className="icon-arrow-top-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="widget-video">
                                            <a href="#" className="popup-youtube">
                                                <i className="flaticon-play fs-18"></i>
                                            </a>
                                            <h6 className="mb-0">Watch Demo</h6>
                                        </div>
                                    </div>
                                    <div className="bot-wrap"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tf-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Hero