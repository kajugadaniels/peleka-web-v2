import React, { useState } from 'react';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile'); // Manage active tab state

    const handleTabClick = (tabName) => {
        setActiveTab(tabName); // Update the active tab state
    };

    return (
        <div className="section-setting-right section-right">
            <div className="box">
                <div className="widget-tabs style-small">
                    <ul className="widget-menu-tab overflow-x-auto">
                        <li
                            className={`item-title ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => handleTabClick('profile')}
                        >
                            Profile
                        </li>
                        <li
                            className={`item-title ${activeTab === 'password' ? 'active' : ''}`}
                            onClick={() => handleTabClick('password')}
                        >
                            Password
                        </li>
                    </ul>
                    <div className="widget-content-tab">
                        {/* Profile Tab Content */}
                        <div
                            className={`widget-content-inner ${activeTab === 'profile' ? 'active' : ''}`}
                            style={{ display: activeTab === 'profile' ? 'block' : 'none' }}
                        >
                            <form action="#" className="shop-checkout">
                                <div className="row">
                                    <div className="profile-wrap">
                                        <div className="profile-img">
                                            <img
                                                id="profile-img"
                                                src="images/avatar/review-1.png"
                                                data-src="images/avatar/review-1.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="profile-info">
                                            <h4>Your avatar</h4>
                                            <label id="name-file">
                                                PNG or JPG no bigger than 800px wide and tall.
                                            </label>
                                        </div>
                                        <div className="profile-btn">
                                            <input id="file-input" type="file" />
                                            <button className="btn-update tf-button-default">
                                                Update <i className="icon-arrow-top-right"></i>
                                            </button>
                                            <a href="#" className="btn-delete tf-button-default">
                                                Delete <i className="icon-arrow-top-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="text"
                                        name="name"
                                        required
                                    />
                                    <label className="tf-field-label fs-15">Name</label>
                                </fieldset>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="email"
                                        name="email"
                                        required
                                    />
                                    <label className="tf-field-label fs-15">Email</label>
                                </fieldset>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="text"
                                        name="phone"
                                        required
                                    />
                                    <label className="tf-field-label fs-15">Phone Number</label>
                                </fieldset>
                            </form>
                            <a href="#" type="submit" className="tf-btn">
                                Update Profile
                                <i className="icon-arrow-top-right"></i>
                            </a>
                        </div>

                        {/* Password Tab Content */}
                        <div
                            className={`widget-content-inner ${activeTab === 'password' ? 'active' : ''}`}
                            style={{ display: activeTab === 'password' ? 'block' : 'none' }}
                        >
                            <form action="#" className="shop-checkout">
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="password"
                                        name="current_password"
                                        required
                                    />
                                    <label className="tf-field-label fs-15" htmlFor="field4">
                                        Current Password
                                    </label>
                                </fieldset>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="password"
                                        name="new_password"
                                        required
                                    />
                                    <label className="tf-field-label fs-15" htmlFor="field4">
                                        New Password
                                    </label>
                                </fieldset>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="password"
                                        name="confirm_password"
                                        required
                                    />
                                    <label className="tf-field-label fs-15" htmlFor="field4">
                                        Confirm Password
                                    </label>
                                </fieldset>
                            </form>
                            <a href="#" type="submit" className="tf-btn">
                                Update Password
                                <i className="icon-arrow-top-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
