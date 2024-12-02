import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Image12, Image4, Image7 } from '../assets/img';

const Hero = () => {
    return (
        <div className="page-title-home9">
            <Swiper
                modules={[Navigation, Pagination, EffectFade, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                effect="fade"
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="slider-home9"
            >
                <SwiperSlide>
                    <div className="image">
                        <img src={Image4} alt="Start Now" />
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
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="image">
                        <img src={Image12} alt="Fast Courier Service" />
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
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="image">
                        <img src={Image7} alt="Rider Booking" />
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
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Hero;
