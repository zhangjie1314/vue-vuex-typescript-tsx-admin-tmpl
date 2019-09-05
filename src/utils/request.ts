import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MAINHOST, conmomPrams } from '@/config'
import { getToken } from './common'
import router from '@/router'
import requestConfig from '@/config/requestConfig'

declare type Methods = 'GET' | 'OPTIONS' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
declare interface Datas {
    method?: Methods,
    [key: string]: any
}
const baseURL = process.env.VUE_APP_BASE_URL || MAINHOST
const token = getToken()

class HttpRequest {
    public queue: any
    public constructor() {
        this.queue = {}
    }
    public interceptors(instance: any, url?: string) {
        // 请求拦截
        instance.interceptors.request.use((config: AxiosRequestConfig) => {
            // 添加全局的loading
            if (!Object.keys(this.queue).length) {
                // show loading
            }
            if (url) {
                this.queue[url] = true
            }
            return config
        })
        // 响应拦截
        instance.interceptors.response.use((res: AxiosResponse) => {
            if (url) {
                this.destroy(url)
            }
            const { data, status } = res
             // 请求成功
            if (status === 200 && data && data.code === 0) { return data }
            // 失败回调
            return requestFail(res)
        }, (error: any) => {
            if (url) {
                this.destroy(url)
            }
            console.log(error)
        })
    }
    public async request(options: AxiosRequestConfig) {
        const instance = axios.create()
        await this.interceptors(instance, options.url)
        return instance(options)
    }
    private destroy(url: string) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // hide loading
        }
    }
}

// 请求失败
const requestFail = (res: AxiosRequestConfig) => {
    const errStr = '网络繁忙！'
    // token失效重新登陆
    if  (res.data.code === 3 || res.data.code === 5) {
        return router.replace({name: 'login'})
    }

    return {
        err: console.error({
            code: res.data.code,
            msg: res.data.msg || errStr,
        }),
    }
}

// 合并axios请求
const conbineOptions = (_opts: any, data: Datas, method: Methods): AxiosRequestConfig => {
    let opts = _opts
    if (typeof opts === 'string') {
        opts = { url: opts }
    }
    const _data = { ...conmomPrams, ...opts.data, ...data }
    const options = {
        method: opts.method || data.method || method || 'GET',
        url: opts.url,
        header: { token },
        baseURL,
    }
    return options.method !== 'GET' ? Object.assign(options, {data: _data}) : Object.assign(options, { params: _data })
}

const HTTP = new HttpRequest()
/**
 * @description 生成整个项目的api方法
 */
const Api = (() => {
    const apiObj: any = {}
    const requestList: any = requestConfig
    const fun = (opts: AxiosRequestConfig | any) => {
        return async (data = {}, method: Methods = 'GET') => {
            if (!token && opts.auth) {
                console.error('没有Token信息！')
                return router.replace({name: 'login'})
            }
            const newOpts = conbineOptions(opts, data, method)
            const res = await HTTP.request(newOpts)
            return res
        }
    }
    Object.keys(requestConfig).forEach((key) => {
        apiObj[key] = fun(requestList[key])
    })
    return apiObj
})()

export default Api as any
