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
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-12">
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
            </div>
        </>
    );
};

export default Faqs;
