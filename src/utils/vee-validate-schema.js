export default {
    userName (value) {
        if (!value) return '请输入用户名'
        if (!/^[\S]{3,12}/.test(value)) return '用户名为3-12个字符'
        return true
    },
    userPassword (value) {
        if (!value) return '请输入密码'
        if (!/^[\S]{6,12}/.test(value)) return '密码是6-12个字符'
        return true
    },
    newPwd (value) {
        if (!value) return '请输入密码'
        if (!/^[\S]{6,12}/.test(value)) return '密码是6-12个字符'
        return true
    }
}