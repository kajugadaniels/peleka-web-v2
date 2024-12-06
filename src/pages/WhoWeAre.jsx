import React from 'react'
import { DownloadApp, Image1, Image11, Image15, Image18, Image20, Image9, Onboarding } from '../assets/img'

const WhoWeAre = () => {
    return (
        <>
            <div className="page-title basic">
                <div className="tf-container full">
                    <div className="row">
                        <div className="col-12">
                            <div className="content text-center">
                                <ul className="breadcrumbs flex items-center justify-center gap-10">
                                    <li>
                                        <a href="/" className="flex">
                                            <i className="icon-home"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <i className="icon-arrow-right"></i>
                                    </li>
                                    <li>Who We Are</li>
                                </ul>
                                <h2 className="font-cardo fw-7">Who We Are</h2>
                                <h6>
                                    Get to know more about us. 
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="flat-about ">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="heading-content ">
                                <div className="widget box-sub-tag wow fadeInUp">
                                    <div className="sub-tag-icon">
                                        <i className="icon-flash"></i>
                                    </div>
                                    <div className="sub-tag-title">
                                        <p>
                                            We are trusted
                                        </p>
                                    </div>
                                </div>
                                <h2 className="font-cardo wow fadeInUp">
                                We are your emmisary and we are unmatched in our line of duty.
                                </h2>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="content-right wow fadeInUp" data-wow-delay="0.1s">
                                <p>
                                We’re the heartbeat of Kigali’s movement—delivering packages, unforgettable rides, and tours that wow. At PELEKA, we don’t just get you there; we make it unforgettable.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="inner">
                                <div className="about-item item-1 wow fadeInUp">
                                    <img className="lazyload" data-src={Image1} src={Image1} alt="" />
                                </div>
                                <div className="about-item item-5 wow fadeInUp">
                                    <img className="lazyload" data-src={Image11} src={Image11} alt="" />
                                </div>
                                <div className="about-item item-2 wow fadeInUp">
                                    <img className="lazyload" data-src={Image15} src={Image15} alt="" />
                                </div>
                                <div className="about-item item-3 wow fadeInUp">
                                    <img className="lazyload" data-src={Image20} src={Image20} alt="" />
                                </div>
                                <div className="about-item item-4 wow fadeInUp">
                                    <img className="lazyload" data-src={Image9} src={Image9} alt="" />
                                </div>
                                <div className="about-item item-6 wow fadeInUp">
                                    <img className="lazyload" data-src={Image18} src={Image18} alt="" />
                                </div>
                                <div className="about-item item-7 wow fadeInUp">
                                    <p>“It’s not just a delivery service it’s a lifeline for busy days and urgent needs. ”</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className="section-icon">
                <div className="tf-container">
                    <div className="row">
                        <div className="wrap-icon-box">
                            <div className="icons-box style-3 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="icons">
                                    <i className="flaticon-play"></i>
                                </div>
                                <div className="content">
                                    <p>
                                        Learn in- skills with over 24,000 video <br />courses
                                    </p>
                                </div>
                            </div>
                            <div className="icons-box style-3 wow fadeInUp" data-wow-delay="0.2s">
                                <div className="icons">
                                    <i className="flaticon-medal"></i>
                                </div>
                                <div className="content">
                                    <p>
                                        Choose courses taught by real-world <br />experts
                                    </p>
                                </div>
                            </div>
                            <div className="icons-box style-3 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="icons">
                                    <i className="flaticon-key"></i>
                                </div>
                                <div className="content">
                                    <p>
                                        Learn at your own pace, with lifetime <br />access on mobile and desktop
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-review bg-4 tf-spacing-11">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-section">
                                <div className="flex items-center justify-between flex-wrap gap-10">
                                    <h2 className="fw-7 lesp-1 wow fadeInUp" data-wow-delay="0.1s">What Our Customers Say</h2>
                                    <div className="sub fs-15 wow fadeInUp" data-wow-delay="0.2s">
                                        Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-container slider-courses-9 wow fadeInUp" data-wow-delay="0.3s">
                                <div className="swiper-wrapper">
                                    {/* Review 1 */}
                                    <div className="swiper-slide">
                                        <div className="box-review">
                                            <div className="review-head">
                                                <div className="head-icon">
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                </div>
                                                <p className="head-verified">
                                                    <i className="icon-check"></i>
                                                    Verified
                                                </p>
                                            </div>
                                            <div className="review-inner">
                                                <h6>Sales process was simple and easy</h6>
                                                <p>
                                                    Sales process was simple and easy,Sales process was simple and easy,Sales process was simple and easy
                                                </p>
                                            </div>
                                            <p className="review-bottom">
                                                <a href="#">Jean-Claude Niyonzima</a>, 2 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    {/* Review 2 */}
                                    <div className="swiper-slide">
                                        <div className="box-review">
                                            <div className="review-head">
                                                <div className="head-icon">
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                </div>
                                                <p className="head-verified">
                                                    <i className="icon-check"></i>
                                                    Verified
                                                </p>
                                            </div>
                                            <div className="review-inner">
                                                <h6>Efficient and fast service</h6>
                                                <p>
                                                    The service was quick and reliable. The process was smooth from start to finish.
                                                </p>
                                            </div>
                                            <p className="review-bottom">
                                                <a href="#">Nadia Uwase</a>, 4 hours ago
                                            </p>
                                        </div>
                                    </div>
                                    {/* Review 3 */}
                                    <div className="swiper-slide">
                                        <div className="box-review">
                                            <div className="review-head">
                                                <div className="head-icon">
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                </div>
                                                <p className="head-verified">
                                                    <i className="icon-check"></i>
                                                    Verified
                                                </p>
                                            </div>
                                            <div className="review-inner">
                                                <h6>Excellent customer support</h6>
                                                <p>
                                                    The customer support team was amazing, very helpful and attentive to my needs.
                                                </p>
                                            </div>
                                            <p className="review-bottom">
                                                <a href="#">Kamanzi Yves</a>, 1 day ago
                                            </p>
                                        </div>
                                    </div>
                                    {/* Review 4 */}
                                    <div className="swiper-slide">
                                        <div className="box-review">
                                            <div className="review-head">
                                                <div className="head-icon">
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                </div>
                                                <p className="head-verified">
                                                    <i className="icon-check"></i>
                                                    Verified
                                                </p>
                                            </div>
                                            <div className="review-inner">
                                                <h6>Fast, reliable, and friendly!</h6>
                                                <p>
                                                    The delivery was quick, and the driver was very friendly. Highly recommend!
                                                </p>
                                            </div>
                                            <p className="review-bottom">
                                                <a href="#">Isabella Umuhoza</a>, 2 days ago
                                            </p>
                                        </div>
                                    </div>
                                    {/* Review 5 */}
                                    <div className="swiper-slide">
                                        <div className="box-review">
                                            <div className="review-head">
                                                <div className="head-icon">
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                    <i className="icon-star-3"></i>
                                                </div>
                                                <p className="head-verified">
                                                    <i className="icon-check"></i>
                                                    Verified
                                                </p>
                                            </div>
                                            <div className="review-inner">
                                                <h6>Convenient and smooth experience</h6>
                                                <p>
                                                    Booking my ride was so easy and the service was top-notch. Definitely using it again!
                                                </p>
                                            </div>
                                            <p className="review-bottom">
                                                <a href="#">Aline Nyirabuhoro</a>, 3 days ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-vison tf-spacing-8 page-about ">
                <div className="tf-container">
                    <div className="row  ">
                        <div className="col-lg-7">
                            <div className="images wow fadeInLeft">
                                <img className="lazyload" data-src={Onboarding} src={Onboarding} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="content">
                                <div className="box-sub-tag wow fadeInUp">
                                    <div className="sub-tag-icon">
                                        <i className="icon-flash"></i>
                                    </div>
                                    <div className="sub-tag-title">
                                        <p>Our Vision</p>
                                    </div>
                                </div>
                                <h2 className="fw-7 font-cardo wow fadeInUp">
                                35,000+ happy clients have chosen us to make their lives easier
                                </h2>
                                <p className="text-content wow fadeInUp">
                                Every ride, delivery, and tour is a step toward a smoother, more efficient world. We're here to keep moving forward, one satisfied customer at a time.
                                </p>
                                <ul className="list">
                                    <li className="item wow fadeInUp">
                                        To redefine convenience by providing fast, reliable, and seamless services that make life easier for everyone in Kigali.
                                    </li>
                                    <li className="item wow fadeInUp">
                                        To become the trusted partner for every delivery, ride, and tour, ensuring every journey is an experience to remember.
                                    </li>
                                    <li className="item wow fadeInUp">
                                        To continuously innovate and grow, expanding our services while maintaining the personal touch that makes PELEKA stand out.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            
        </>
    )
}

export default WhoWeAre