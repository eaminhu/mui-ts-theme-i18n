import { PaletteMode } from '@mui/material'
import { alpha } from '@mui/material/styles'
import colors from '@/config/colors.json'

const GREY = colors.gray as {
    '0': '#FFFFFF'
    '100': '#F9FAFB'
    '200': '#F4F6F8'
    '300': '#DFE3E8'
    '400': '#C4CDD5'
    '500': '#919EAB'
    '600': '#637381'
    '700': '#454F5B'
    '800': '#212B36'
    '900': '#161C24'
}
// 参考ui：https://minimals.cc/components

const getDesignTokens = (mode: PaletteMode) => ({
    isDark: mode === 'dark',
    mode,
    common: { black: '#000', white: '#fff' },
    primary: colors.primary,
    secondary: colors.secondary,
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    grey: colors.gray,
    divider: alpha(GREY[500], 0.24),
    action: {
        active: GREY[600],
        hover: alpha(GREY[500], 0.08),
        selected: alpha(GREY[500], 0.16),
        disabled: alpha(GREY[500], 0.8),
        disabledBackground: alpha(GREY[500], 0.24),
        focus: alpha(GREY[500], 0.24),
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
    ...(mode === 'dark'
        ? {
              text: {
                  primary: '#fff',
                  secondary: GREY[500],
                  disabled: GREY[600],
              },
              background: {
                  paper: GREY[800],
                  default: GREY[900],
                  neutral: alpha(GREY[500], 0.16),
              },
          }
        : {
              text: {
                  primary: GREY[800],
                  secondary: GREY[600],
                  disabled: GREY[500],
              },
              background: {
                  paper: '#fff',
                  default: GREY[100],
                  neutral: GREY[200],
              },
          }),
})

export default getDesignTokens
