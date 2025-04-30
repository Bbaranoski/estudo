import axios from 'axios'

const api = axios.create({
    baseURL: 'http://breno:3000',
})

export default api