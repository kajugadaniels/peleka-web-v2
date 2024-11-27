import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { passwordReset } from '../../api'
import { toast } from 'react-toastify'
import { WhoWeAre1 } from '../../assets/img';

const PasswordResetConfirm = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmailOrPhone = localStorage.getItem('passwordResetEmailOrPhone');
        if (storedEmailOrPhone) {
            setEmailOrPhone(storedEmailOrPhone);
        } else {
            toast.error('Not allowed to visit this page.');
            navigate('/');
        }
    }, [navigate]);

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
        if (!emailOrPhone) {
            return 'Email or phone number is required.';
        }
        if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
            return 'Enter a valid email address or phone number.';
        }
        if (!otp) {
            return 'OTP is required.';
        }
        if (!/^\d{7}$/.test(otp)) {
            return 'OTP must be a 7-digit number.';
        }
        if (!newPassword) {
            return 'New password is required.';
        }
        if (newPassword.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
        if (newPassword !== confirmPassword) {
            return 'Passwords do not match.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateInputs();
        if (validationError) {
            toast.error(validationError);
            return;
        }

        setLoading(true);
        const { success, message } = await passwordResetConfirm(emailOrPhone, otp, newPassword);
        setLoading(false);

        if (success) {
            toast.success(message);
            localStorage.removeItem('passwordResetEmailOrPhone');
            navigate('/login');
        } else {
            toast.error(message);
            localStorage.removeItem('passwordResetEmailOrPhone');
            navigate('/forget-password');
        }
    };

    return (
        <div>PasswordResetConfirm</div>
    )
}

export default PasswordResetConfirm