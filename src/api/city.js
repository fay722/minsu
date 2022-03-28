import request from '@/utils/request'

export const getAllCity = () => {
    return request('/api/getAllCity', 'get')
}

export const idGetCity = (data) => {
    return request('/api/idGetCity', 'get', data)
}