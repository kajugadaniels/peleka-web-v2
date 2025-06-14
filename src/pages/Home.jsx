import React from 'react'
import { DownloadApp, Onboarding, WhoWeAre1, WhoWeAre2 } from '../assets/img'
import { Faqs, Hero } from '../components'

const Home = () => {
    return (
        <>
            <Hero />

            <section className="section-about-box-style2 tf-spacing-1">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="image">
                                <div className="image-one">
                                    <img className=" ls-is-cached lazyloaded" src={WhoWeAre1} data-src={WhoWeAre1} alt="" />
                                </div>
                                <div className="image-two">
                                    <img className=" ls-is-cached lazyloaded" src={WhoWeAre2} data-src={WhoWeAre2} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="content">
                                <div className="box-sub-tag wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="sub-tag-icon">
                                        <i className="icon-flash"></i>
                                    </div>
                                    <div className="sub-tag-title">
                                        <p>knowledge meets innovation</p>
                                    </div>
                                </div>
                                <h2 className="title fw-7 lesp-1 wow fadeInUp" data-wow-delay="0.2s">
                                    Who We Are
                                </h2>
                                <p className="fs-15 wow fadeInUp" data-wow-delay="0.3s">
                                At PELEKA LTD, we’re all about connecting people, places, and possibilities. Whether it’s swift deliveries, reliable taxi moto rides, or scenic tours around Kigali, we bring efficiency, local expertise, and a passion for service to every journey.
                                </p>
                                <p className="fs-15 wow fadeInUp" data-wow-delay="0.4s">
                                With us, it’s not just about getting there—it’s about enjoying the ride and doing it with a smile.
                                </p>
                                <a href="#" className="tf-btn wow fadeInUp" data-wow-delay="0.5s">
                                    Learn More
                                    <i className="icon-arrow-top-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-why tf-spacing-6 bg-4">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="heading-section text-center">
                                <h2 className="fw-7 font-cardo wow fadeInUp" data-wow-delay="0.1s">
                                    <span className="tf-secondary-color">Why</span> Ride With Us?
                                </h2>
                                <div className="sub fs-15 wow fadeInUp" data-wow-delay="0.2s">
                                    We are convinced you will take pride in working with us.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="icons-box wow fadeInUp" data-wow-delay="0.3s">
                                <div className="icons has-ellipse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="#585D69" d="M16 1.2c-1 0-1.8.8-1.8 1.8S15 4.8 16 4.8S17.8 4 17.8 3S17 1.2 16 1.2m-3.6 2.9c-.47 0-.9.19-1.2.5L7.5 8.29C7.19 8.6 7 9 7 9.5c0 .63.33 1.16.85 1.47L11.2 13v5H13v-6.5l-2.25-1.65l2.32-2.35L14.8 10H19V8.2h-3.2l-1.94-3.27c-.29-.5-.86-.83-1.46-.83M10 3H3c-.55 0-1-.45-1-1s.45-1 1-1h9.79c-.21.34-.38.71-.47 1.11c-.86.02-1.67.34-2.32.89m-5 9c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5M19 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5M5.32 11H1c-.552 0-1-.45-1-1s.448-1 1-1h4.05c-.02.16-.05.33-.05.5c0 .53.12 1.04.32 1.5M6 7H2c-.55 0-1-.45-1-1s.45-1 1-1h5.97L6.09 6.87C6.05 6.91 6 6.96 6 7" /></svg>
                                </div>
                                <div className="content">
                                    <h4>
                                        <a className="fw-5" href="#">
                                            Courier Delivery
                                        </a>
                                    </h4>
                                    <p>
                                    Got a package to send? We’ll handle it like it’s gold. From doorstep pickups to speedy deliveries across Kigali, our riders are as fast as they are reliable. When PELEKA’s on the job, your package is in safe hands—and always on time.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="icons-box wow fadeInUp" data-wow-delay="0.3s">
                                <div className="icons has-ellipse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="#585D69" d="M6.94 2c.416 0 .753.324.753.724v1.46c.668-.012 1.417-.012 2.26-.012h4.015c.842 0 1.591 0 2.259.013v-1.46c0-.4.337-.725.753-.725s.753.324.753.724V4.25c1.445.111 2.394.384 3.09 1.055c.698.67.982 1.582 1.097 2.972L22 9H2v-.724c.116-1.39.4-2.302 1.097-2.972s1.645-.944 3.09-1.055V2.724c0-.4.337-.724.753-.724" /><path fill="#585D69" d="M22 14v-2c0-.839-.004-2.335-.017-3H2.01c-.013.665-.01 2.161-.01 3v2c0 3.771 0 5.657 1.172 6.828S6.228 22 10 22h4c3.77 0 5.656 0 6.828-1.172S22 17.772 22 14" opacity="0.5" /><path fill="#585D69" d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0" /></svg>
                                </div>
                                <div className="content">
                                    <h4>
                                        <a className="fw-5" href="#">
                                            Rider Booking
                                        </a>
                                    </h4>
                                    <p>
                                    Need a ride? We’ve got your back (and your helmet). Whether it’s a quick dash across town or a few hours of hassle-free transportation, our moto riders will get you there safely, comfortably, and with the wind in your hair.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="icons-box wow fadeInUp" data-wow-delay="0.3s">
                                <div className="icons has-ellipse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 48 48"><g fill="#585D69" fillRule="evenodd" clipRule="evenodd"><path d="M24 6c-4.5 0-7 1.2-7 1.2V12l-3.529 3.529c-.593.593-.236 1.588.6 1.648c2.017.143 5.434.323 9.929.323c2.206 0 4.152-.043 5.8-.104h-.017a6 6 0 1 1-11.567 0q-1.111-.041-2.036-.09a8 8 0 1 0 15.64 0a113 113 0 0 0 2.109-.13c.836-.06 1.193-1.054.6-1.647L30.999 12V7.2S28.5 6 24 6m-5 6.828l-2.492 2.492c1.93.097 4.462.18 7.492.18s5.562-.083 7.492-.18L29 12.828V8.62l-.302-.08C27.656 8.276 26.07 8 24 8s-3.656.276-4.698.54q-.16.04-.302.08zM30.148 9.01l-.002-.002z" /><path d="m24.288 28.042l6.542 1.947l5.607-3.816A1 1 0 0 1 38 27v5h-2v-3.11l-4 2.722V40c0 .768.289 1.47.764 2H15.236c.475-.53.764-1.232.764-2v-8.465l-4-2.666V32h-2v-5a1 1 0 0 1 1.555-.832l5.696 3.797l6.46-1.923A1 1 0 0 1 24 28q.125 0 .247.031l.008.002zM25 30.341l5 1.488V40h-5zm-7 1.488l5-1.488V40h-5z" /><path d="M9 36a1 1 0 0 0-1 1v3h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1zm-3 1a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H6zm33-1a1 1 0 0 1 1 1v3h-3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1zm3 1a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h5z" /></g></svg>
                                </div>
                                <div className="content">
                                    <h4>
                                        <a className="fw-5" href="#">
                                            Tourism On Bike
                                        </a>
                                    </h4>
                                    <p>
                                    Discover Kigali like never before—with a guide who knows every hidden gem! Hop on for a scenic tour of the city’s vibrant streets, serene landscapes, and breathtaking views. With PELEKA, every ride is an adventure waiting to happen.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-get-started style5 tf-spacing-11">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="getstared-image">
                                <img className="lazyload" data-src={Onboarding} src={Onboarding} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="getstared-content">
                                <h2 className="title fw-7 wow fadeInUp" data-wow-delay="0.1s">
                                    App Features
                                </h2>
                                <p className="wow fadeInUp" data-wow-delay="0.2s">
                                PELEKA's app puts convenience in your hands. With just a few taps, enjoy faster, smoother deliveries, rides, and tours—anytime, anywhere.
                                </p>
                                <div className="tags wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="tag">
                                        <i className="flaticon-check"></i>
                                        <span>Real-Time Package Tracking</span>
                                    </div>
                                    <div className="tag">
                                        <i className="flaticon-check"></i>
                                        <span>Scheduled Pickups</span>
                                    </div>
                                    <div className="tag">
                                        <i className="flaticon-check"></i>
                                        <span>30-Minute Delivery</span>
                                    </div>
                                </div>
                                <a href="#" className="tf-btn wow fadeInUp" data-wow-delay="0.4s">
                                    Download Peleka App
                                    <i className="icon-arrow-top-right"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Faqs />

            <section className="section-mobile-app style2 ">
                <div className="tf-container">
                    <div className="mobile-app-wrap">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="content-left">
                                    <div className="box-sub-tag wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="sub-tag-icon">
                                            <i className="icon-flash"></i>
                                        </div>
                                        <div className="sub-tag-title">
                                            <p>Download & Enjoy</p>
                                        </div>
                                    </div>
                                    <h2 className="fw-7 lesp-1 wow fadeInUp" data-wow-delay="0.2s">
                                    Your Reliable Partner, <span className="tf-secondary-color">Anytime</span>
                                        <br />Anywhere.
                                    </h2>
                                    <p className="fs-15 wow fadeInUp" data-wow-delay="0.3s" style={{ paddingRight: '20px' }}>
                                        No matter where you are in Kigali, PELEKA is here to make your life easier. <br />Download the app today and enjoy seamless deliveries, rides, and tours<br /> with just a few taps.
                                    </p>
                                    <ul className="tf-app-download tf-app-download-style-2 app-download-mobie wow fadeInUp" data-wow-delay="0.4s">
                                        <li>
                                            <a href="#">
                                                <div className="icon">
                                                    <i className="icon-apple"></i>
                                                </div>
                                                <div className="app">
                                                    <div>Download on the</div>
                                                    <div>Apple Store</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <div className="icon">
                                                    <i className="icon-chplay"></i>
                                                </div>
                                                <div className="app">
                                                    <div>Get in on</div>
                                                    <div>Google Play</div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="image">
                                    <img className="lazyload" data-src={DownloadApp} src={DownloadApp} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home