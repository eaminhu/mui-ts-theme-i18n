/** @type {import('tailwindcss').Config} */
// 颜色配置文件，和mui共用一份，参考ui：https://minimals.cc/components
const colors = require('./config/colors.json')

module.exports = {
    mode: 'jit',
    important: '#root',
    // 需要配置对应的tsx文件目录，tailwind的样式才会生效
    content: [
        './sections/**/*.{jsx,tsx}',
        './layouts/**/*.{jsx,tsx}',
        './pages/**/*.{jsx,tsx}',
        './components/**/*.{jsx,tsx}',
        './app/**/*.{jsx,tsx}',
    ],
    corePlugins: {
        preflight: false,
        // 禁用blur类名和React Lazy Load Image Component有冲突
        blur: false,
    },
    theme: {
        screens: {
            sm: '600px',
            md: '900px',
            lg: '1200px',
            xl: '1600px',
        },
        extend: {
            colors: {
                'gray-100': colors.gray['100'],
                'gray-200': colors.gray['200'],
                'gray-300': colors.gray['300'],
                'gray-400': colors.gray['400'],
                'gray-500': colors.gray['500'],
                'gray-600': colors.gray['600'],
                'gray-700': colors.gray['700'],
                'gray-800': colors.gray['800'],
                'gray-900': colors.gray['900'],

                'primary-lighter': colors.primary.lighter,
                'primary-light': colors.primary.light,
                'primary-main': colors.primary.main,
                'primary-dark': colors.primary.dark,
                'primary-darker': colors.primary.darker,
                'primary-contrastText': colors.primary.contrastText,

                'secondary-lighter': colors.secondary.lighter,
                'secondary-light': colors.secondary.light,
                'secondary-main': colors.secondary.main,
                'secondary-dark': colors.secondary.dark,
                'secondary-darker': colors.secondary.darker,
                'secondary-contrastText': colors.secondary.contrastText,

                'info-lighter': colors.info.lighter,
                'info-light': colors.info.light,
                'info-main': colors.info.main,
                'info-dark': colors.info.dark,
                'info-darker': colors.info.darker,
                'info-contrastText': colors.info.contrastText,

                'success-lighter': colors.success.lighter,
                'success-light': colors.success.light,
                'success-main': colors.success.main,
                'success-dark': colors.success.dark,
                'success-darker': colors.success.darker,
                'success-contrastText': colors.success.contrastText,

                'warning-lighter': colors.warning.lighter,
                'warning-light': colors.warning.light,
                'warning-main': colors.warning.main,
                'warning-dark': colors.warning.dark,
                'warning-darker': colors.warning.darker,
                'warning-contrastText': colors.warning.contrastText,

                'error-lighter': colors.error.lighter,
                'error-light': colors.error.light,
                'error-main': colors.error.main,
                'error-dark': colors.error.dark,
                'error-darker': colors.error.darker,
                'error-contrastText': colors.error.contrastText,
            },
            backgroundColor: (theme) => ({
                ...theme('colors'),
                paper: '#fff',
                default: colors.gray['100'],
                neutral: colors.gray['200'],
                'dark-paper': colors.gray['800'],
                'dark-default': colors.gray['900'],
                'dark-neutral': colors.gray['200'],
            }),
            textColor: (theme) => ({
                ...theme('colors'),
                primary: colors.gray['800'],
                secondary: colors.gray['600'],
                disabled: colors.gray['500'],
                'dark-primary': '#fff',
                'dark-secondary': colors.gray['500'],
                'dark-disabled': colors.gray['600'],
                link: colors.primary.main,
                activity: colors.primary.main,
                contrastText: colors.gray['800'],
            }),
        },
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
}
