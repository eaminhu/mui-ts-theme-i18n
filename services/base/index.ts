import Router from 'next/router'
import { request } from '@/utils/request'
import { BaseService } from './types'

const localeCode: { [key: string]: string } = {
    'en-US': 'GB',
    'zh-CN': 'CN',
    'zh-HK': 'HK',
}

/**
 * 获取国家列表
 */
export async function getCountryList() {
    return request
        .post<BaseService.GetCountryListRes[]>(
            '/global/config.app.AppDictDubboService.getCountryListByParentCode',
            {
                parentCode: '-1',
            },
            {
                version: null,
            },
        )
        .then((response) => {
            const lang = Router.locale || Router.defaultLocale || 'zh-HK'
            return response
                .sort((a, b) => a.displayName.localeCompare(b.displayName, lang === 'en-US' ? 'en' : 'zh'))
                .sort((a) => {
                    // 把当前选中多语言国家放最前面
                    if (a.code === localeCode[lang]) {
                        return -1
                    }
                    return 0
                })
        })
}
