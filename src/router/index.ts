import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { getToken } from '@/utils/common'

Vue.use(Router)

const router = new Router({ routes })

// 登陆页面路由
const LOGIN_PAGE_NAME = 'login'

// 跳转之前
router.beforeEach((to, from, next) => {
    const token = getToken()
    if (!token && to.name !== LOGIN_PAGE_NAME) {
        // 未登陆且跳转不是登陆页，跳转到登陆页面
        next({
            name: LOGIN_PAGE_NAME,
        })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
        // 未登陆且跳转页面为登陆页， 跳转
        next()
    } else if (token && to.name === LOGIN_PAGE_NAME) {
        // 已登陆且跳转页面为登陆页，跳转到首页 index
        next({
            name: 'index',
        })
    } else {
        if (token) {
            next()
        } else {
            next({
                name: LOGIN_PAGE_NAME,
            })
        }
    }
})

// 跳转之后
// router.afterEach(to => {})
export default router
