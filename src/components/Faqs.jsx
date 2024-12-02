import React, { useState } from 'react';
import { Image20 } from '../assets/img';

const Faqs = () => {
    // State to manage which accordion item is currently open
    const [openItem, setOpenItem] = useState(null);

    // Function to toggle accordion items
    const toggleItem = (item) => {
        // If the item clicked is already open, close it, otherwise open the clicked item
        if (openItem === item) {
            setOpenItem(null);
        } else {
            setOpenItem(item);
        }
    }

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
                                {['One', 'Two', 'Three'].map((item, index) => (
                                    <div className="tf-accordion-item" key={index}>
                                        <h3 className="tf-accordion-header">
                                            <span
                                                className={`tf-accordion-button ${openItem === item ? '' : 'collapsed'}`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${item}`}
                                                aria-expanded={openItem === item}
                                                aria-controls={`collapse${item}`}
                                                onClick={() => toggleItem(item)}
                                            >
                                                Question {item}
                                            </span>
                                        </h3>
                                        <div id={`collapse${item}`} className={`tf-accordion-collapse collapse ${openItem === item ? 'show' : ''}`}
                                             data-bs-parent="#accordionExample">
                                            <div className="tf-accordion-content">
                                                <p>
                                                    Lorem ipsum dolor sit amet consectur adipiscing elit sed eius mod ex tempor incididunt labore dolore magna aliquaenim ad minim eniam.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="faq-image">
                            <img className="lazyload" data-src={Image20} src={Image20} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Faqs;
