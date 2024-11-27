import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { passwordReset } from '../../api'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmailOrPhone = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
        if (!value) {
            return 'Email or phone number is required.';
        }
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
            return 'Enter a valid email address or phone number.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateEmailOrPhone(emailOrPhone);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setLoading(true);
        const { success, message } = await passwordReset(emailOrPhone);
        setLoading(false);

        if (success) {
            toast.success(message);
            localStorage.setItem('passwordResetEmailOrPhone', emailOrPhone);
            navigate('/password-reset-confirm');
        } else {
            toast.error(message);
            localStorage.removeItem('passwordResetEmailOrPhone');
        }
    };

    return (
        <div>ForgetPassword</div>
    )
}

export default ForgetPassword