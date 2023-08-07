import React, { useCallback } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material'
import { Localization, enUS, zhCN, zhHK } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'
import { deepmerge } from '@mui/utils'
import { enUS as datePickerEnUS, zhCN as datePickerZhCN } from '@mui/x-date-pickers'
import mediaQuery from 'css-mediaquery'
import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-hk'
import { useThemeMode } from '@/hooks'
import breakpoints from './breakpoints'
import customShadows from './customShadows'
import GlobalStyles from './globalStyles'
import componentsOverride from './overrides'
import getDesignTokens from './palette'
import shadows from './shadows'
import typography from './typography'
import { zhHK as datePickerZhHK } from './x-date-picker-locales-zh-hk'

interface ThemeProviderProps {
    children: React.ReactNode
    /** 用户访问设备类型 */
    deviceType: 'desktop' | 'mobile'
}

const localePackages: { [key: string]: Localization } = {
    'zh-CN': zhCN,
    'en-US': enUS,
    'zh-HK': zhHK,
}

// x-date-pickers 多语言，繁体需要单独配置
const datePickerLocalePackages: { [key: string]: any } = {
    'zh-CN': datePickerZhCN,
    'en-US': datePickerEnUS,
    'zh-HK': datePickerZhHK,
}

// dayjs多语言，LocalizationProvider 组件的adapterLocale参数
export const adapterLocaleMap: { [key: string]: string } = {
    'zh-CN': 'zh-cn',
    'en-US': 'en',
    'zh-HK': 'zh-hk',
}

export interface IThemeContext {
    toggleMode: () => void // 切换白天黑夜模式
}

export const ThemeContext = React.createContext({} as IThemeContext)

export default function ThemeProvider({ children, deviceType }: ThemeProviderProps) {
    const { i18n } = useTranslation()
    const { mode } = useThemeMode()

    /** 因为服务端无法获取客户端的设备宽度，所以需要手动获取设备类型然后手动设置服务端媒体查询判断规则 */
    const ssrMatchMedia = useCallback(
        (query: string) => ({
            matches: mediaQuery.match(query, {
                // The estimated CSS width of the browser.
                width: deviceType === 'mobile' ? '0px' : '1024px',
            }),
        }),
        [deviceType],
    )

    const themeOptions = useMemo(
        () => ({
            palette: getDesignTokens(mode),
            shape: { borderRadius: 6 },
            typography,
            shadows: shadows(mode),
            customShadows: customShadows(mode),
            breakpoints,
            components: {
                // 设置服务端渲染媒体查询规则
                MuiUseMediaQuery: {
                    defaultProps: {
                        ssrMatchMedia,
                    },
                },
            },
        }),
        [mode, ssrMatchMedia],
    )

    const themeWithLocale = React.useMemo(() => {
        const localesComponents = localePackages[i18n.language].components
        const datePickerLocalesComponents = datePickerLocalePackages[i18n.language].components
        const theme = createTheme(themeOptions as any)
        // 合并自定义组件默认样式，和组件多语言文案
        theme.components = deepmerge(componentsOverride(theme), deepmerge(localesComponents, datePickerLocalesComponents))
        return theme
    }, [i18n.language, themeOptions])

    return (
        <MUIThemeProvider theme={themeWithLocale}>
            <CssBaseline />
            <GlobalStyles />
            {children}
        </MUIThemeProvider>
    )
}
