import React from 'react'

const Faqs = () => {
    return (
        <section className="section-faq-h6 tf-spacing-11 bg-4">
            <div className="tf-container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="faq-content">
                            <div className="heading-section">
                                <h2 className="fw-7 lesp-1 wow fadeInUp" data-wow-delay="0.1s">
                                    Frequently Asked Questions
                                </h2>
                                <div className="sub fs-15 wow fadeInUp" data-wow-delay="0.2s">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                                </div>
                            </div>
                            <div className="tf-accordion-style-2 tf-accordion wow fadeInUp" data-wow-delay="0.3s">
                                <div className="tf-accordion-item">
                                    <h3 className="tf-accordion-header">
                                        <span className="tf-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            Question One
                                        </span>
                                    </h3>
                                    <div id="collapseOne" className="tf-accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="tf-accordion-content">
                                            <p>
                                                Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tf-accordion-item">
                                    <h3 className="tf-accordion-header">
                                        <span className="tf-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            Question Two
                                        </span>
                                    </h3>
                                    <div id="collapseTwo" className="tf-accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="tf-accordion-content">
                                            <p>
                                                Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tf-accordion-item">
                                    <h3 className="tf-accordion-header">
                                        <span className="tf-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                            Question Three
                                        </span>
                                    </h3>
                                    <div id="collapseThree" className="tf-accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="tf-accordion-content">
                                            <p>
                                                Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="faq-image">
                            <img className="lazyload" data-src="https://img.freepik.com/premium-photo/crm-business-person-customer-service-support-black-man-working-from-office-home-online-computer-telemarketing-with-internet-call-center-agent-help-desk-receptionist-video-call_590464-88770.jpg" src="https://img.freepik.com/premium-photo/crm-business-person-customer-service-support-black-man-working-from-office-home-online-computer-telemarketing-with-internet-call-center-agent-help-desk-receptionist-video-call_590464-88770.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faqs