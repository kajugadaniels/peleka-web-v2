import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import PropTypes from 'prop-types';

/**
 * CourierPayment Component
 * Handles Flutterwave payments for delivery requests.
 *
 * Props:
 * - amount: Number - The amount to be charged.
 * - tx_ref: String - Unique transaction reference.
 * - customer: Object - Customer details (name, email, phone_number).
 * - onSuccess: Function - Callback for successful payment.
 * - onFailure: Function - Callback for failed payment.
 */
const CourierPayment = ({ amount, tx_ref, customer, onSuccess, onFailure }) => {
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
            title: 'Delivery Request Payment',
            description: 'Payment for your delivery request',
            logo: import.meta.env.VITE_FLUTTERWAVE_LOGO_URL,
        },
    };

    // Configuration for the Flutterwave button
    const fwConfig = {
        ...paymentConfig,
        text: 'Send Delivery Request', // Fixed button text
        className: 'tf-btn', // Matching existing button's class for consistent styling
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
CourierPayment.propTypes = {
    amount: PropTypes.number.isRequired,
    tx_ref: PropTypes.string.isRequired,
    customer: PropTypes.shape({
        email: PropTypes.string.isRequired,
        phone_number: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
};

export default CourierPayment;
