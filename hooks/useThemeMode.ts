import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'next-themes'
import { PaletteMode } from '@mui/material'
import { RootState } from '@/models'

/**
 * @name 白天黑夜皮肤切换hook
 */
export default function useThemeMode(): { mode: PaletteMode; toggleThemeMode: () => void } {
    // next-themes 用来控制html的黑夜模式类名和获取系统是否黑夜模式
    const { setTheme } = useTheme()
    const dispatch = useDispatch()
    const { themeMode } = useSelector(
        ({ base }: RootState) => ({
            themeMode: base.themeMode,
        }),
        shallowEqual,
    )

    return {
        mode: themeMode,
        toggleThemeMode: () => {
            const mode = themeMode === 'dark' ? 'light' : 'dark'
            dispatch.base.toggleThemeMode(mode)
            setTheme(mode)
        },
    }
}
