/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

const LAYOUT = () => import('@/views/layout/layout.tsx')

export default [
    {
        path: '/',
        redirect: '/index',
        meta: {
            hide: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.tsx'),
        meta: {
            icon: '',
            keepAlive: true,
            title: '登陆',
            hide: true,
        },
    },
    {
        path: '/index',
        component: LAYOUT,
        meta: {
            icon: '',
            keepAlive: false,
            title: '首页',
            hide: false,
        },
        children: [
            {
                path: '/',
                name: 'main_index',
                component: () => import('@/views/index/index.tsx'),
                meta: {
                    icon: '',
                    keepAlive: false,
                    title: '首页',
                },
            },
        ],
    },
]
