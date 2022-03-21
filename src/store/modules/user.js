export default {
    namespace: true,
    state () {
        return {
            user: {
                username: '',
                token: '',
            }
        }
    },
    mutations: {
        setUser (state, data) {
            state.user = data
        }
    }
}