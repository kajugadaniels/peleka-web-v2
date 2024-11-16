import React from 'react'

const GetDeliveryRequests = () => {
    return (
        <div className="section-quizzes-right">
            <div className="section-inner">
                <div className="box-2 section-right">
                    <div className="heading-section flex justify-between items-center">
                        <h6 className="fw-5 fs-22 wow fadeInUp">Delivery Requests</h6>
                        <a href="#" className="tf-btn wow fadeInUp" data-wow-delay="0.1s">
                            Send New Request
                            <i className="icon-arrow-top-right"></i>
                        </a>
                    </div>
                    <div className="filter pd-40">
                        <div className="header-search flex-grow wow fadeInUp">
                            <form action="#" className="form-search">
                                <fieldset>
                                    <input className="" type="text" placeholder="Search for anything" name="text" tabindex="2" value="" aria-required="true" required="" />
                                </fieldset>
                                <div className="button-submit">
                                    <button className="" type="submit">
                                        <i className="icon-search fs-20"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="sort-by-wrap wow fadeInUp" data-wow-delay="0.1s">
                            <div className="sort-wrap">
                                <p className="text text-2">Sort by</p>
                                <div className="nice-select default" tabindex="0">
                                    <span className="current text text-1">Date Created</span>
                                    <ul className="list">
                                        <li data-value className="option selected text text-1">
                                            Newest
                                        </li>
                                        <li data-value className="option selected text text-1">
                                            Oldest
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wg-box">
                        <div className="table-box-2">
                            <div className="head wow fadeInUp">
                                <div className="item">
                                    <div className=" fs-15 fw-5"> Students</div>
                                </div>
                                <div className="item">
                                    <div className=" fs-15 fw-5">Score</div>
                                </div>
                                <div className="item">
                                    <div className=" fs-15 fw-5">Attempt</div>
                                </div>
                                <div className="item">
                                    <div className=" fs-15 fw-5">Finishing time</div>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <div className="box-2-item item border-bottom wow fadeInUp">
                                        <div className="image">
                                            <img src="https://creativelayers.net/themes/upskill-html/images/instructors/instructors-01.jpg" data-src="https://creativelayers.net/themes/upskill-html/images/instructors/instructors-01.jpg" alt="" />
                                        </div>
                                        <div className="title">
                                            <a className="fs-15 fw-5" href="#">
                                                Kristin Watson
                                            </a>
                                        </div>
                                        <div>
                                            <p className="fs-15 fw-5">
                                                75/100
                                            </p>
                                        </div>
                                        <div>
                                            <p className="fs-15 fw-5">
                                                3 attempts
                                            </p>
                                        </div>
                                        <div>
                                            <p className="fs-15 fw-5">
                                                20 July, 9:39am
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetDeliveryRequests