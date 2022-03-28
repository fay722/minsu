export default {
    userName (value) {
        if (!value) return '请输入用户名'
        if (!/^[\S]{3,12}/.test(value)) return '用户名为3-12个字符'
        // if (/[\\u4E00-\\u9FFF]/.test(value)) return '用户名不可以有中文哦'
        return true
    },
    userPassword (value) {
        if (!value) return '请输入密码'
        if (!/^[\S]{6,12}/.test(value)) return '密码是6-12个字符'
        return true
    },
    tel (value) {
        if (!value) return '请输入手机号'
        if (!/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(value)) return '请输入正确的手机号'
        return true
    },
    // newPwd (value, pwd) {
    //     console.log(pwd);
    //     if (!value) return '请输入密码'
    //     if (!/^[\S]{6,12}/.test(value)) return '密码是6-12个字符'
    //     if (value !== pwd) return '两次密码不一致'
    //     return true
    // }
}