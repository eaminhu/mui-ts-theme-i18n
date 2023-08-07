import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { Router } from 'next/router'
import { PaletteMode } from '@mui/material'
import { clearCache } from 'ahooks'
import { __DARK_MODE__, __TOKEN__ } from '@/constant'
import { createModel } from '@rematch/core'
import type { RootModel } from '.'

interface BaseState {
    themeMode: PaletteMode
    token: string | undefined
}

interface LogoutFunctionParams {
    /** url参数 */
    query?: {
        /** 是否超时10分钟未登录 */
        isIdle?: boolean
    }
}

const model = createModel<RootModel>()({
    state: {
        themeMode: getCookie(__DARK_MODE__),
        token: getCookie(__TOKEN__),
    } as BaseState,
    effects: () => ({
        async toggleThemeMode(themeMode) {
            setCookie(__DARK_MODE__, themeMode)
            this.updateThemeMode({
                themeMode,
            })
        },
        /** 清除登录token，跳转登录页面 */
        async logout(options: LogoutFunctionParams = {}) {
            const { query } = options
            // 清除接口缓存
            clearCache()

            // 删除store和cookie的token
            deleteCookie(__TOKEN__)
            this.updateToken({
                token: undefined,
            })

            // 跳转到登录页面

            // if (Router.router?.route !== '/login') {
            //     Router.replace({
            //         pathname: '/login',
            //         query: {
            //             referrer: Router.router?.asPath || '',
            //             ...(query || {}),
            //         },
            //     }).then((res) => {
            //         if (res) {
            //             Router.reload()
            //         }
            //     })
            // }
        },
    }),
    reducers: {
        updateThemeMode: (state, payload) => ({
            ...state,
            ...payload,
        }),
        updateToken: (state, payload) => ({
            ...state,
            ...payload,
        }),
    },
})

export default model
