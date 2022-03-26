export default {
    namespace: true,
    state () {
        return {
            user: {
                userName: '',
                tel: '',
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