import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const emailService = {
    sendContact: async (contactData) => {
        const response = await api.post('/contact', contactData)
        return response.data
    },
}

export default api