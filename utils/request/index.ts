import { getCookie } from 'cookies-next'
import Router from 'next/router'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { headerParams } from '@/config'
import { __TOKEN__ } from '@/constant'
import Store from '@/models'
import { guid } from '..'
import Toast from '../toast'
import { encryptParams } from './requestEncrypt'

interface CustomerAxiosRequestConfig extends AxiosRequestConfig {
    /** 传字符串修改请求头version版本，传null直接删除请求头version字段 */
    version?: string | null
    /** 接口跳过报错提示code */
    skipErrorCode?: string[]
    /** 跳过报错提示 */
    skipCatchSpecialErrors?: boolean
    /** 请求参数是否需要加密 */
    doNotEncrypt?: boolean
}

const service = axios.create({
    baseURL: '/api/cats-gateway',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        companyId: headerParams.companyId,
        version: '0.0.1',
    },
    withCredentials: true,
    timeout: 20000,
})

/* 请求拦截器 */
service.interceptors.request.use(
    (config: CustomerAxiosRequestConfig) => {
        const timestamp = Date.now()

        if (config?.headers) {
            config.headers.trace = (headerParams.isEncrypt ? 'x-' : '') + guid()

            if (config.version) {
                config.headers.version = config.version
            }

            if (config.version === null) {
                delete config.headers.version
            }

            config.headers.timestamp = timestamp
            config.headers.token = getCookie(__TOKEN__) || ''

            const lang = Router.locale || Router.defaultLocale
            if (lang) {
                config.headers.lang = lang
            }
        }

        // 加密请求参数
        if (headerParams.isEncrypt && config.doNotEncrypt !== false) {
            config.data = { data: encryptParams(config.data, timestamp) }
        }

        return config
    },
    (error: AxiosError) => {
        console.log('🚀 ~ file: index.ts:41 ~ error', error)
        Toast.error(error.message)
        return Promise.reject(error)
    },
)

/* 响应拦截器 */
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const { code, msg, data } = response.data
        const config: CustomerAxiosRequestConfig = response.config

        // 登录态过期
        if (['GATEWAY_CODE_001', 'GATEWAY_CODE_005'].includes(code)) {
            Store.dispatch.base.logout()
            return Promise.reject(new Error(msg))
        }

        if (code === '0') {
            return data
        } else {
            // 判断是否需要跳过报错提示
            if (config.skipErrorCode?.includes(code) || config.skipCatchSpecialErrors) {
                console.warn(msg)
            } else {
                Toast.error(msg)
            }

            if (config.skipCatchSpecialErrors) {
                return null
            }

            return Promise.reject(new Error(msg))
        }
    },
    (error: AxiosError) => {
        console.log('🚀 ~ file: request.ts ~ line 30 ~ error', error.message)
        Toast.error(error.message)
        return Promise.reject(error)
    },
)

/* 导出封装的请求方法 */
export const request = {
    get<T = any>(url: string, config?: CustomerAxiosRequestConfig): Promise<T> {
        return service.get(url, config)
    },
    post<T = any>(url: string, data?: object, config?: CustomerAxiosRequestConfig): Promise<T> {
        return service.post(url, data, config)
    },
}
