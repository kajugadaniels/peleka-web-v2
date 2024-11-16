import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateUser } from '../../api'; // Ensure this function is correctly implemented
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile'); // Manage active tab state
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone_number: '',
        image: null,
        role: '1',
    });
    const [passwords, setPasswords] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
    });
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);
    const navigate = useNavigate();

    // Fetch user data on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to access this page.');
            navigate('/login');
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser({
                name: storedUser.name || '',
                email: storedUser.email || '',
                phone_number: storedUser.phone_number || '',
                image: null, // Reset image; handled via file input
                role: storedUser.role_name || 'N/A',
            });
        }
    }, [navigate]);

    // Handle tab switching
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    // Handle input changes for profile
    const handleProfileInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser((prevUser) => ({
                ...prevUser,
                image: file,
            }));
        }
    };

    // Handle input changes for password
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    // Validate profile form
    const validateProfileForm = () => {
        const { name, email, phone_number } = user;

        if (!name.trim()) {
            toast.error('Name is required.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return false;
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone_number)) {
            toast.error('Phone number must be between 10 and 15 digits.');
            return false;
        }

        return true;
    };

    // Validate password form
    const validatePasswordForm = () => {
        const { current_password, new_password, confirm_password } = passwords;

        if (!current_password.trim() || !new_password.trim() || !confirm_password.trim()) {
            toast.error('All password fields are required.');
            return false;
        }

        if (new_password.length < 8) {
            toast.error('New password must be at least 8 characters long.');
            return false;
        }

        if (new_password !== confirm_password) {
            toast.error('Passwords do not match.');
            return false;
        }

        return true;
    };

    // Handle profile submission
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (!validateProfileForm()) return;

        setLoadingProfile(true);

        try {
            let payload;
            let headers = {};

            if (user.image) {
                // Use FormData for image upload
                payload = new FormData();
                payload.append('name', user.name);
                payload.append('email', user.email);
                payload.append('phone_number', user.phone_number);
                payload.append('image', user.image);
                headers['Content-Type'] = 'multipart/form-data';
            } else {
                // Send JSON if no image is being uploaded
                payload = {
                    name: user.name,
                    email: user.email,
                    phone_number: user.phone_number,
                };
                headers['Content-Type'] = 'application/json';
            }

            // Make the API call
            const response = await updateUser(payload, headers); // Ensure updateUser can handle both payloads

            if (response.success) {
                toast.success(response.message || 'Profile updated successfully.');
                if (response.user) {
                    // Update localStorage with the new user data
                    localStorage.setItem('user', JSON.stringify(response.user));
                    setUser((prevUser) => ({
                        ...prevUser,
                        name: response.user.name || '',
                        email: response.user.email || '',
                        phone_number: response.user.phone_number || '',
                        image: null, // Reset image after upload
                        role: response.user.role_name || 'N/A',
                    }));
                }
            } else {
                toast.error(response.message || 'Failed to update profile.');
            }
        } catch (error) {
            console.error('Profile Update Error:', error);
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        toast.error(data.message || 'Invalid input data.');
                        break;
                    case 401:
                        toast.error('Session expired. Please login again.');
                        navigate('/login');
                        break;
                    case 403:
                        toast.error('You do not have permission to perform this action.');
                        break;
                    case 422:
                        toast.error(data.message || 'Validation error.');
                        break;
                    default:
                        toast.error('An error occurred while updating your profile.');
                }
            } else {
                toast.error('Network error. Please check your connection.');
            }
        } finally {
            setLoadingProfile(false);
        }
    };

    // Handle password submission
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!validatePasswordForm()) return;

        setLoadingPassword(true);

        try {
            const payload = {
                current_password: passwords.current_password,
                new_password: passwords.new_password,
                confirm_password: passwords.confirm_password,
            };

            const headers = {
                'Content-Type': 'application/json',
            };

            // Make the API call
            const response = await updateUser(payload, headers); // Ensure updateUser can handle password payload

            if (response.success) {
                toast.success(response.message || 'Password updated successfully.');
                // Clear password fields
                setPasswords({
                    current_password: '',
                    new_password: '',
                    confirm_password: '',
                });
            } else {
                toast.error(response.message || 'Failed to update password.');
            }
        } catch (error) {
            console.error('Password Update Error:', error);
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        toast.error(data.message || 'Invalid input data.');
                        break;
                    case 401:
                        toast.error('Session expired. Please login again.');
                        navigate('/login');
                        break;
                    case 403:
                        toast.error('You do not have permission to perform this action.');
                        break;
                    case 422:
                        toast.error(data.message || 'Validation error.');
                        break;
                    default:
                        toast.error('An error occurred while updating your password.');
                }
            } else {
                toast.error('Network error. Please check your connection.');
            }
        } finally {
            setLoadingPassword(false);
        }
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
                            <form className="shop-checkout" onSubmit={handleProfileSubmit}>
                                <div className="row">
                                    <div className="profile-wrap">
                                        <div className="profile-img">
                                            <img
                                                id="profile-img"
                                                src={
                                                    user.image
                                                        ? URL.createObjectURL(user.image)
                                                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                }
                                                alt="Profile"
                                            />
                                        </div>
                                        <div className="profile-info">
                                            <h4>Your Avatar</h4>
                                            <label id="name-file">PNG or JPG no bigger than 800px wide and tall.</label>
                                        </div>
                                        <div className="profile-btn">
                                            <input
                                                id="file-input"
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleProfileInputChange}
                                        placeholder="Name"
                                        required
                                    />
                                    <label className="tf-field-label fs-15">Name</label>
                                </fieldset>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleProfileInputChange}
                                        placeholder="Email"
                                        required
                                    />
                                    <label className="tf-field-label fs-15">Email</label>
                                </fieldset>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="text"
                                        name="phone_number"
                                        value={user.phone_number}
                                        onChange={handleProfileInputChange}
                                        placeholder="Phone Number"
                                        required
                                    />
                                    <label className="tf-field-label fs-15">Phone Number</label>
                                </fieldset>
                                <button type="submit" className="tf-btn" disabled={loadingProfile}>
                                    {loadingProfile ? 'Updating...' : 'Update Profile'}
                                </button>
                            </form>
                        </div>

                        {/* Password Tab Content */}
                        <div
                            className={`widget-content-inner ${activeTab === 'password' ? 'active' : ''}`}
                            style={{ display: activeTab === 'password' ? 'block' : 'none' }}
                        >
                            <form className="shop-checkout" onSubmit={handlePasswordSubmit}>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="password"
                                        name="current_password"
                                        value={passwords.current_password}
                                        onChange={handlePasswordInputChange}
                                        placeholder="Current Password"
                                        required
                                    />
                                    <label className="tf-field-label fs-15">Current Password</label>
                                </fieldset>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="password"
                                        name="new_password"
                                        value={passwords.new_password}
                                        onChange={handlePasswordInputChange}
                                        placeholder="New Password"
                                        required
                                    />
                                    <label className="tf-field-label fs-15">New Password</label>
                                </fieldset>
                                <fieldset className="tf-field">
                                    <input
                                        className="tf-input style-1"
                                        type="password"
                                        name="confirm_password"
                                        value={passwords.confirm_password}
                                        onChange={handlePasswordInputChange}
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    <label className="tf-field-label fs-15">Confirm Password</label>
                                </fieldset>
                                <button type="submit" className="tf-btn" disabled={loadingPassword}>
                                    {loadingPassword ? 'Updating...' : 'Update Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
