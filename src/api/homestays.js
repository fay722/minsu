import request from '@/utils/request'

// 获取民宿信息
export const getHomestays = () => {
    return request('/api/homestays', 'get')
}

// 获取指定id的民宿详情信息
export const getHomestaysInfo = (data) => {
    return request('/api/homestays/details', 'get', data)

}

// 根据城市获取民宿信息
export const getCityHomestays = (data) => {
    return request('/api/cityHomestays', 'get', data)
}

// 搜索关键字
export const getSearchHomestay = (data) => {
    return request('/api/searchHomestay', 'get', data)
}