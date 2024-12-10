import React, { useState } from 'react'

const HelpCenter = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };
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
                                    <li>Help Center</li>
                                </ul>
                                <h2 className="font-cardo fw-7">Help Center</h2>
                                <h6>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-content pt-0 ">
                <section className="section-items page-help tf-spacing-25">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="wrap-icons-box">
                                    <div className="icons-box style-5 wow fadeInUp">
                                        <div className="icons">
                                            <i className="flaticon-arrow-up"></i>
                                        </div>
                                        <div className="content">
                                            <h4>
                                                One
                                            </h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="icons-box style-5 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="icons">
                                            <i className="flaticon-user-1"></i>
                                        </div>
                                        <div className="content">
                                            <h4>
                                                Two
                                            </h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="icons-box style-5 wow fadeInUp" data-wow-delay="0.2s">
                                        <div className="icons">
                                            <i className="icon-troubleshooting"></i>
                                        </div>
                                        <div className="content">
                                            <h4>
                                                Three
                                            </h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="icons-box style-5 wow fadeInUp">
                                        <div className="icons">
                                            <i className="flaticon-buy"></i>
                                        </div>
                                        <div className="content">
                                            <h4>
                                                Four
                                            </h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="icons-box style-5 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="icons">
                                            <i className="flaticon-play-2"></i>
                                        </div>
                                        <div className="content">
                                            <h4>
                                                Five
                                            </h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="icons-box style-5 wow fadeInUp" data-wow-delay="0.2s">
                                        <div className="icons">
                                            <i className="flaticon-mobile-phone"></i>
                                        </div>
                                        <div className="content">
                                            <h4>
                                                Six</h4>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="tf-spacing-4  section-faq page-help pt-0">
                    <div className="tf-container">
                        <div className="row justify-center">
                            <div className="col-xl-10 col-sm-12">
                                <div className="heading-section text-center">
                                    <h2 className="fw-7 font-cardo wow fadeInUp">
                                        Frequently Asked
                                        <span className="tf-secondary-color">Questions</span>
                                    </h2>
                                    <div className="sub fs-15 wow fadeInUp">
                                        Here are the questions about us.
                                    </div>
                                </div>
                                <div className="page-faq-content faq-1">
                                    <div className="tf-accordion-default tf-accordion" id="accordionExample">
                                        <div className="tf-accordion-item wow fadeInUp" data-wow-delay="0s">
                                            <h3
                                                className="tf-accordion-header"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => toggleAccordion('collapseOne')}
                                            >
                                                <div
                                                    className={`tf-accordion-button ${activeAccordion === 'collapseOne' ? '' : 'collapsed'}`}
                                                    aria-expanded={activeAccordion === 'collapseOne'}
                                                    aria-controls="collapseOne"
                                                >
                                                    <span className="rectangle-314"></span>
                                                    Question One
                                                </div>
                                            </h3>
                                            <div
                                                id="collapseOne"
                                                className={`tf-accordion-collapse collapse ${activeAccordion === 'collapseOne' ? 'show' : ''}`}
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="tf-accordion-content">
                                                    <p className="fs-15">
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tf-accordion-item wow fadeInUp" data-wow-delay="0s">
                                            <h3
                                                className="tf-accordion-header"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => toggleAccordion('collapseTwo')}
                                            >
                                                <div
                                                    className={`tf-accordion-button ${activeAccordion === 'collapseTwo' ? '' : 'collapsed'}`}
                                                    aria-expanded={activeAccordion === 'collapseTwo'}
                                                    aria-controls="collapseTwo"
                                                >
                                                    <span className="rectangle-314"></span>
                                                    Question Two
                                                </div>
                                            </h3>
                                            <div
                                                id="collapseTwo"
                                                className={`tf-accordion-collapse collapse ${activeAccordion === 'collapseTwo' ? 'show' : ''}`}
                                                data-bs-parent="#accordionExample"
                                            >
                                                <div className="tf-accordion-content">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default HelpCenter