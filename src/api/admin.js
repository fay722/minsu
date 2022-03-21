import request from '@/utils/request'

export const getPermission = () => {
    return request('/admin/getPermission', 'get')
}