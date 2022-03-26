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

// 获取收藏数
export const getCollectNum = (data) => {
    return request('/api/getCollectNum', 'get', data)
}

// 修改房屋状态
export const editHomestayStatus = (data) => {
    return request('/api/editHomestayStatus', 'get', data)
}

// 退订 修改状态为0
export const editTuidingStatus = (data) => {
    return request('/api/editTuidingStatus', 'get', data)
}