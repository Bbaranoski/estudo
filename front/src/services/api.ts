import axios from 'axios'

const api = axios.create({
    baseURL: 'http://breno:3000',
})

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if(token) {
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

export default api