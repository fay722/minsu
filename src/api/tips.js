import request from '@/utils/request'

export const getTip = (data) => {
    return request('my/getTip', 'get', data)
}