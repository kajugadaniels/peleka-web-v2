import React from 'react'

const Jumbotron = ({ userName, userPhoneNumber, userEmail }) => {
    return (
        <div className="page-title style-9 bg-5">
            <div className="tf-container">
                <div className="row items-center">
                    <div className="col-lg-8">
                        <div className="content">
                            <div className="author-item">
                                <div className="author-item-img">
                                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="" />
                                </div>
                            </div>
                            <div className="title">
                                <h2 className="font-cardo fw-7 mb-20">
                                    Welcome, {userName}
                                </h2>
                                <ul className="entry-meta mt-4 mb-4">
                                    <li>
                                        <i className="flaticon-call"></i>
                                        {userPhoneNumber}
                                    </li>
                                    <li>
                                        <i className="flaticon-message"></i>
                                        {userEmail}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="right-content">
                            <a className="tf-btn" href="/login">
                                Logout
                                <i className="icon-arrow-top-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron