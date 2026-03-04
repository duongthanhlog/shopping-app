import axios from 'axios'

const createAxiosInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL,
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
    return instance
}
console.log(process.env.NEXT_PUBLIC_API_BASE_URL)

export const api = createAxiosInstance(process.env.NEXT_PUBLIC_API_BASE_URL!)
export const apiDummy = createAxiosInstance(
    process.env.NEXT_PUBLIC_DUMMY_BASE_URL!
)
