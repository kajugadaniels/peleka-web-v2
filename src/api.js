import axios from 'axios';

const BACKEND_BASE_URL =
    window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
        ? 'http://127.0.0.1:8000'
        : 'https://www.api.pelekaap.com';

const API_BASE_URL = `${BACKEND_BASE_URL}/api/web`;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async ({ email_or_phone, password }) => {
    try {
        const response = await api.post('/login/', { email_or_phone, password });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        let message = 'An error occurred during login. Please try again.';
        if (error.response) {
            message = error.response.data.error || error.response.data.detail || message;
        }
        return {
            success: false,
            message,
        };
    }
};


export const passwordReset = async (emailOrPhone) => {
    try {
        const response = await api.post('/password-reset/', { email_or_phone: emailOrPhone });
        return {
            success: true,
            message: response.data.message,
        };
    } catch (error) {
        let message = 'An error occurred during password reset request. Please try again.';
        if (error.response) {
            message = error.response.data.error || error.response.data.detail || message;
        }
        return {
            success: false,
            message,
        };
    }
};

export const passwordResetConfirm = async (emailOrPhone, otp, newPassword) => {
    try {
        const response = await api.post('/password-reset-confirm/', {
            email_or_phone: emailOrPhone,
            otp,
            password: newPassword,
        });
        return {
            success: true,
            message: response.data.message,
        };
    } catch (error) {
        let message = 'An error occurred during password reset confirmation. Please try again.';
        if (error.response) {
            if (error.response.data.non_field_errors) {
                message = error.response.data.non_field_errors.join(' ');
            } else if (error.response.data.detail) {
                message = error.response.data.detail;
            } else {
                message = error.response.data.error || message;
            }
        }
        return {
            success: false,
            message,
        };
    }
};

export const logout = async (token) => {
    try {
        const response = await api.post('/logout/',
            {},
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
        return {
            success: true,
            message: response.data.message,
        };
    } catch (error) {
        let message = 'An error occurred during logout. Please try again.';
        if (error.response) {
            message = error.response.data.error || error.response.data.detail || message;
        }
        return {
            success: false,
            message,
        };
    }
};

export const registerUser = async (data) => {
    try {
        const response = await api.post('/register/', data, {});
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : new Error('An error occurred while adding the user.');
    }
};

export const updateUser = async (data) => {
    const sanitizedData = {
        email: data.email,
        name: data.name,
        password: data.password,
        phone_number: data.phone_number,
        role: data.role,
        status: data.status,
    };

    console.log('Sanitized data to be sent:', sanitizedData);
    try {
        const response = await api.put('/profile-update/', sanitizedData, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error response from server:', error.response);
        throw error.response ? error.response.data : new Error('Failed to update account.');
    }
};

export const fetchDeliveryRequests = async () => {
    try {
        const response = await api.get('/delivery-requests/', {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response 
            ? error.response.data 
            : new Error('An error occurred while fetching delivery requests.');
    }
};

export const addDeliveryRequest = async (data) => {
    try {
        const response = await api.post('/delivery-request/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data 
            : new Error('An error occurred while adding the delivery request.');
    }
};

export const fetchDeliveryRequestById = async (id) => {
    try {
        const response = await api.get(`/delivery-request/${id}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching delivery request by ID:', error);
        throw error.response && error.response.data
            ? error.response.data 
            : new Error('An error occurred while fetching delivery request details.');
    }
};

export const contactUs = async (data) => {
    try {
        const response = await api.post('/contact-us/', data, {});
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : new Error('An error occurred while adding the user.');
    }
};

export const cancelDeliveryRequest = async (id) => {
    try {
        const response = await api.patch(`/delivery-request/cancel/${id}/`, {}, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        let message = 'An error occurred while canceling the delivery request. Please try again.';
        if (error.response) {
            message = error.response.data.message || error.response.data.detail || message;
        }
        return {
            success: false,
            message,
        };
    }
};

export const completeDeliveryRequest = async (id) => {
    try {
        const response = await api.patch(`/delivery-request/complete/${id}/`, {}, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        let message = 'An error occurred while completing the delivery request. Please try again.';
        if (error.response) {
            message = error.response.data.message || error.response.data.detail || message;
        }
        return {
            success: false,
            message,
        };
    }
};

export const listBookRiders = async () => {
    try {
        const response = await api.get('/book-riders/', {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response 
            ? error.response.data 
            : new Error('An error occurred while fetching book riders.');
    }
};

export const addBookRider = async (data) => {
    try {
        const response = await api.post('/book-rider/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data 
            : new Error('An error occurred while adding the BookRider request.');
    }
};

export const fetchBookRiderById = async (id) => {
    try {
        const response = await api.get(`/book-rider/${id}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching BookRider by ID:', error);
        throw error.response && error.response.data
            ? error.response.data 
            : new Error('An error occurred while fetching BookRider details.');
    }
};

export const updateBookRider = async (id, data) => {
    try {
        const response = await api.put(`/book-rider/update/${id}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response 
            ? error.response.data 
            : new Error('An error occurred while updating the BookRider request.');
    }
};

export const deleteBookRider = async (id) => {
    try {
        const response = await api.delete(`/book-rider/delete/${id}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response 
            ? error.response.data 
            : new Error('An error occurred while deleting the BookRider request.');
    }
};

export const cancelBookRider = async (id) => {
    try {
        const response = await api.patch(`/book-rider/cancel/${id}/`, {}, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        let message = 'An error occurred while canceling the BookRider request. Please try again.';
        if (error.response) {
            message = error.response.data.message || error.response.data.detail || message;
        }
        return {
            success: false,
            message,
        };
    }
};

export const completeBookRider = async (id) => {
    try {
        const response = await api.patch(`/book-rider/complete/${id}/`, {}, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        let message = 'An error occurred while completing the BookRider request. Please try again.';
        if (error.response) {
            message = error.response.data.message || error.response.data.detail || message;
        }
        return {
            success: false,
            message,
        };
    }
};
