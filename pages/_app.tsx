import NiceModal from '@ebay/nice-modal-react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import React from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-photo-view/dist/react-photo-view.css'
import { Provider } from 'react-redux'
import { getCookie } from 'cookies-next'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { ThemeProvider as PreferredThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import App from 'next/app'
import { Router } from 'next/router'
import { PaletteMode } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMount } from 'ahooks'
import { ConfirmProvider } from 'material-ui-confirm'
import { SnackbarProvider } from 'notistack'
import NProgress from 'nprogress'
import 'public/styles/global.scss'
import 'public/styles/nprogress.scss'
import qs from 'qs'
import 'swiper/css'
import 'swiper/css/pagination'
import parser from 'ua-parser-js'
import { __DARK_MODE__, __TOKEN__ } from '@/constant'
import Store from '@/models'
import ThemeProvider, { adapterLocaleMap } from '@/theme'
import { setUtmStorage } from '@/utils'
import { SnackbarUtilsConfig } from '@/utils/toast'
import createEmotionCache from '../theme/createEmotionCache'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
    /** 服务端黑夜模式cookie */
    themeMode: PaletteMode
    /** 用户访问设备类型 */
    deviceType: 'desktop' | 'mobile'
    token: string
}

Router.events.on('routeChangeStart', () => {
    NProgress.start()
})
Router.events.on('routeChangeError', () => {
    NProgress.done()
})
Router.events.on('routeChangeComplete', () => {
    NProgress.done()
})

function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps, themeMode, deviceType, token } = props
    const { i18n } = useTranslation(['common'])

    useMount(() => {
        const query = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        })
        // 接收设置utm注册来源
        if (query?.utm_source) {
            setUtmStorage(query)
        }
    })

    return (
        <CacheProvider value={emotionCache}>
            <Provider
                store={Store}
                serverState={{
                    base: {
                        token,
                        themeMode,
                    },
                    loading: false as any,
                }}
            >
                <PreferredThemeProvider enableSystem={false} defaultTheme={themeMode}>
                    <ThemeProvider deviceType={deviceType}>
                        <SnackbarProvider maxSnack={3} autoHideDuration={1500} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                            <SnackbarUtilsConfig />
                            <NiceModal.Provider>
                                <ConfirmProvider
                                    defaultOptions={{
                                        cancellationButtonProps: { variant: 'outlined' },
                                        confirmationButtonProps: {
                                            variant: 'contained',
                                        },
                                    }}
                                >
                                    {/* date-pickers组件国际化 */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={adapterLocaleMap[i18n.language]}>
                                        <Component {...pageProps} />
                                    </LocalizationProvider>
                                </ConfirmProvider>
                            </NiceModal.Provider>
                        </SnackbarProvider>
                    </ThemeProvider>
                </PreferredThemeProvider>
            </Provider>
        </CacheProvider>
    )
}

MyApp.getInitialProps = async (appContext: any) => {
    const appProps = await App.getInitialProps(appContext)

    // 用户设备类型
    const deviceType = parser(appContext.ctx.req.headers['user-agent']).device.type || 'desktop'

    // 从服务端读取cookie，初始化到页面上
    const themeMode = getCookie(__DARK_MODE__, appContext.ctx)
    const token = getCookie(__TOKEN__, appContext.ctx)

    return { ...appProps, token, themeMode, deviceType }
}

export default appWithTranslation(MyApp)
