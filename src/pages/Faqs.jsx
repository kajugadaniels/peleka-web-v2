import React, { useState } from 'react';

const Faqs = () => {
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
                                    <li>FAQs</li>
                                </ul>
                                <h2 className="font-cardo fw-7">Frequently Asked Questions</h2>
                                <h6>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-content tf-spacing-1">
                <section className="section-faq-page">
                    <div className="tf-container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="page-faq-content faq-1">
                                    <div className="heading-section">
                                        <h2 className="font-cardo wow fadeInUp" data-wow-delay="0s">Purchases & Refunds</h2>
                                        <p className="fs-15 wow fadeInUp" data-wow-delay="0s">Here are the questions about this
                                            template.</p>
                                    </div>
                                    <div className="tf-accordion-default tf-accordion" id="accordionExample">
                                        <div className="tf-accordion-item wow fadeInUp" data-wow-delay="0s">
                                            <h3 className="tf-accordion-header">
                                                <button
                                                    className={`tf-accordion-button ${activeAccordion === 'collapseOne' ? '' : 'collapsed'}`}
                                                    onClick={() => toggleAccordion('collapseOne')}
                                                    aria-expanded={activeAccordion === 'collapseOne'}
                                                    aria-controls="collapseOne"
                                                >
                                                    <span className="rectangle-314"></span>
                                                    High-Quality Video Lessons
                                                </button>
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
                                            <h3 className="tf-accordion-header">
                                                <button
                                                    className={`tf-accordion-button ${activeAccordion === 'collapseTwo' ? '' : 'collapsed'}`}
                                                    onClick={() => toggleAccordion('collapseTwo')}
                                                    aria-expanded={activeAccordion === 'collapseTwo'}
                                                    aria-controls="collapseTwo"
                                                >
                                                    <span className="rectangle-314"></span>
                                                    Personalized Feedback and Support
                                                </button>
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
    );
};

export default Faqs;
