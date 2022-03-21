import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import { getItem, setItem } from '@/utils/storage'
import user from './modules/user'

export default createStore({
    modules: {
        user
    },
    // 默认是存储在localStorage中 key是存储数据的键名
    // paths是存储state中的那些数据，如果是模块下具体的数据需要加上模块名称，如user.token
    plugins: [
        createPersistedstate({
            key: 'vuex',
            paths: ['user']
        })
    ]
})
