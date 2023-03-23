import axios from 'axios'
import {toast} from 'react-toastify'
import config from 'config.json'

axios.defaults.baseURL = config.apiEndpoint

axios.interceptors.response.use(response => response, function (error) {
    console.log('Interceptor', error)
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500
    if (!expectedErrors) {
        console.log(error)
        toast.info('Something went wrong. Try later...')
        toast.error('Something went wrong. Try later...')
    }
    return Promise.reject(error)
})

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}

export default httpService