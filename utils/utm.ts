import qs from 'qs'
import { __UTM_CAMPAIGN__, __UTM_CONTENT__, __UTM_MEDIUM__, __UTM_SOURCE__, __UTM_TERM__ } from '@/constant'

/** 设置utm缓存 */
export const setUtmStorage = (query: qs.ParsedQs) => {
    const { utm_source = '', utm_medium = '', utm_campaign = '', utm_content = '', utm_term = '' } = query || {}
    // 缓存utm参数
    if (typeof utm_source === 'string') {
        window.sessionStorage.setItem(__UTM_SOURCE__, utm_source)
    }
    if (typeof utm_medium === 'string') {
        window.sessionStorage.setItem(__UTM_MEDIUM__, utm_medium)
    }
    if (typeof utm_campaign === 'string') {
        window.sessionStorage.setItem(__UTM_CAMPAIGN__, utm_campaign)
    }
    if (typeof utm_content === 'string') {
        window.sessionStorage.setItem(__UTM_CONTENT__, utm_content)
    }
    if (typeof utm_term === 'string') {
        window.sessionStorage.setItem(__UTM_TERM__, utm_term)
    }
}

/**
 * 获取设备类型
    注册来源:1=移动端web：H5，2=pcweb：PC_Web，3=系统&后台注册：System，4=安卓原生app：Android，5=苹果原生app：iOS，6=鸿蒙OS：HOS，7=pc windows客户端：PC_Win,8=pc mac客户端：PC_Mac，9=不属于以上的：其他
 */
export function getDevice() {
    // 是否为智能设备
    const IS_SMART_DEVICE = /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/.test(navigator.userAgent)
    if (IS_SMART_DEVICE) return 1
    return 2
    // // 是否为 IOS 浏览器
    // const IS_IOS_BROWSER = /iPhone|iPod|iPad/.test(navigator.userAgent)

    // // 是否为 Android 浏览器
    // const IS_ANDROID_BROWSER = /Android/.test(navigator.userAgent)

    // // PC浏览器, 非智能设备
    // const IS_NOT_SMART_DEVICE = !IS_SMART_DEVICE
    // // PCUI_Mac
    // const IS_MAC = /macintosh|mac os x/i.test(navigator.userAgent)

    // if (IS_IOS_BROWSER) return 3
    // else if (IS_ANDROID_BROWSER) return 2
    // else if (IS_SMART_DEVICE) return 1

    // if (IS_NOT_SMART_DEVICE) {
    //     if (IS_MAC) return 5
    //     return 4
    // }

    // return 1
}

/** 获取utm缓存 */
export function getUtmStorage() {
    const utmSource = window.sessionStorage.getItem(__UTM_SOURCE__)
    const utmMedium = window.sessionStorage.getItem(__UTM_MEDIUM__)
    const utmCampaign = window.sessionStorage.getItem(__UTM_CAMPAIGN__)
    const utmContent = window.sessionStorage.getItem(__UTM_CONTENT__)
    const utmTerm = window.sessionStorage.getItem(__UTM_TERM__)
    const registerSource = getDevice()

    return {
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        registerSource,
    }
}
