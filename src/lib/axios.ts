import axios from 'axios'

const createAxiosInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
    return instance
}
export const api = createAxiosInstance(process.env.NEXT_PUBLIC_API_BASE_URL!)
export const apiDummy = createAxiosInstance(process.env.NEXT_PUBLIC_DUMMY_BASE_URL!)
