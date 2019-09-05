export default {
    login: {
        url: '/user/login',
        method: 'POST',
        auth: false,
    }, // 登陆
    getData: {
        url: '/mock/5c09ca373601b6783189502a/example/mock',
        method: 'GET',
        auth: true,
    }, // 随机数据 来自 easy mock
}
