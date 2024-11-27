import axios from 'axios';

const API_BASE_URL =
    window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
        ? 'http://127.0.0.1:8000/api/web'
        : 'http://159.89.14.178/api/web';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (email, password) => {
    try {
        const response = await api.post('/login/', { email, password });
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