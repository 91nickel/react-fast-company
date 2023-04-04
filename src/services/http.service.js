import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from 'config.json'

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

http.defaults.baseURL = configFile.apiEndpoint

http.interceptors.request.use(
    function (config) {
        if (configFile.isFirebase) {
            const isContainsSlash = /\/$/.test(config.url)
            config.url = (isContainsSlash ? config.url.slice(0, -1) : config.url) + '.json'
            // console.log(config.url)
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

function transformData (data) {
    return data ? Object.keys(data).map(key => ({...data[key]})) : []
}

http.interceptors.response.use(
    function (response) {
        if (configFile.isFirebase) {
            // console.log('beforeTransform', response.data)
            response.data = {content: transformData(response.data)}
            // console.log('afterTransform', response.data)
        }
        return response
    },
    function (error) {
        // console.log('Interceptor', error)
        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500
        if (!expectedErrors) {
            // console.log(error)
            toast.info('Something went wrong. Try later...')
            toast.error('Something went wrong. Try later...')
        }
        return Promise.reject(error)
    })

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
}

export default httpService