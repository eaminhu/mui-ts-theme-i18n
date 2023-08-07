import { useMediaQuery, useTheme } from '@mui/material'
import { BREAKPOINTS } from '@/constant'

interface useMediaReturnType {
    /** 屏幕小于600px */
    lessThanSm: boolean
    /** 屏幕小于900px */
    lessThanMd: boolean
    /** 屏幕大于900px */
    greaterThanMd: boolean
    /** 屏幕小于1200px */
    lessThanLg: boolean
    /** 屏幕小于1600px */
    lessThanXl: boolean
    /** 屏幕小于900px，判断为移动端 */
    isMobile: boolean
    /** 屏幕大于900px，判断为pc端 */
    isPc: boolean
}

/**
 * 此函数返回一个具有 5 个布尔属性的对象，这些属性为 true 或 false，具体取决于当前屏幕大小。
 * @returns 具有以下属性的对象：
 * @returns lessThanSm: boolean - 屏幕小于600px
 * @returns lessThanXl：boolean - 屏幕小于1600px
 * @returns lessThanMd: boolean - 屏幕小于900px
 * @returns lessThanLg：boolean - 屏幕小于1200px
 * @returns greaterThanMd: boolean-  屏幕大于900px
 */
export default function useMedia(): useMediaReturnType {
    const theme = useTheme()

    const lessThanSm = useMediaQuery(theme.breakpoints.down(BREAKPOINTS.sm))
    const lessThanMd = useMediaQuery(theme.breakpoints.down(BREAKPOINTS.md))
    const greaterThanMd = useMediaQuery(theme.breakpoints.up(BREAKPOINTS.md))
    const lessThanLg = useMediaQuery(theme.breakpoints.down(BREAKPOINTS.lg))
    const lessThanXl = useMediaQuery(theme.breakpoints.down(BREAKPOINTS.xl))

    return { lessThanXl, lessThanLg, lessThanMd, lessThanSm, greaterThanMd, isMobile: lessThanMd, isPc: greaterThanMd }
}
