import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bear ${token}`
    }
    return config
})

export const productsInstance = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json',
    },
})

export default instance
