/*
 * @Description: 公共函数
 * @Author: Jack
 * @Date: 2019-09-03 11:05:20
 * @LastEditors: Jack
 * @LastEditTime: 2019-09-03 11:05:20
 */

import Cookies from 'js-cookie'
import { cookieExpires } from '@/config'

/**
 * @author Jack
 * @msg 存取token
 * @param {String} token
 */
export const TOKEN_KEY: string = 'token'
export const setToken = (token: string) => {
    Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) {
        return token
    } else {
        return false
    }
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: string) => {
    const keyValueArr = url.split('?')[1].split('&')
    const paramObj: any = {}
    keyValueArr.forEach((item) => {
        const keyValue = item.split('=')
        paramObj[keyValue[0]] = keyValue[1]
    })
    return paramObj
}

/**
 * @description 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性，如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj: any, key: string | number) => {
    if (key) {
        return key in obj
    } else {
        const keysArr = Object.keys(obj)
        return keysArr.length
    }
}
