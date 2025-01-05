// src/components/FlutterwavePayment.jsx

import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import PropTypes from 'prop-types';

/**
 * FlutterwavePayment Component
 * Encapsulates the Flutterwave payment button and handles payment callbacks.
 *
 * Props:
 * - amount: Number - The amount to be charged.
 * - tx_ref: String - Unique transaction reference.
 * - customer: Object - Customer details (name, email, phone_number).
 * - onSuccess: Function - Callback for successful payment.
 * - onFailure: Function - Callback for failed payment.
 * - buttonText: String - Text to display on the payment button.
 * - title: String - Title for the payment modal.
 * - description: String - Description for the payment modal.
 */
const FlutterwavePayment = ({
    amount,
    tx_ref,
    customer,
    onSuccess,
    onFailure,
    buttonText,
    title,
    description,
}) => {
    // Payment configuration using environment variables for security
    const paymentConfig = {
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: tx_ref,
        amount: amount,
        currency: import.meta.env.VITE_FLUTTERWAVE_CURRENCY,
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: customer.email,
            phone_number: customer.phone_number,
            name: customer.name,
        },
        customizations: {
            title: title,
            description: description,
            logo: import.meta.env.VITE_FLUTTERWAVE_LOGO_URL,
        },
    };

    // Configuration for the Flutterwave button
    const fwConfig = {
        ...paymentConfig,
        text: buttonText, // Using the buttonText prop
        className: 'tf-btn', // Matching the existing button's class for consistent styling
        callback: (response) => {
            console.log('Payment successful:', response);
            closePaymentModal(); // Close the payment modal
            if (response.status === 'successful') {
                onSuccess(response);
            } else {
                onFailure(response);
            }
        },
        onClose: () => {
            console.log('Payment modal closed');
            onFailure(); // Handle payment modal closure without completion
        },
    };

    return <FlutterWaveButton {...fwConfig} />;
};

// Prop type validation for better developer experience
FlutterwavePayment.propTypes = {
    amount: PropTypes.number.isRequired,
    tx_ref: PropTypes.string.isRequired,
    customer: PropTypes.shape({
        email: PropTypes.string.isRequired,
        phone_number: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    buttonText: PropTypes.string, // New prop
    title: PropTypes.string, // New prop
    description: PropTypes.string, // New prop
};

// Default props
FlutterwavePayment.defaultProps = {
    buttonText: 'Send Rider Booking',
    title: 'Rider Booking Payment',
    description: 'Payment for your rider booking',
};

export default FlutterwavePayment;
