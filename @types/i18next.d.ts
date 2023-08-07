/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next'
import type common from '../public/locales/zh-CN/common.json'

interface I18nNamespaces {
    common: typeof common
}

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'common'
        resources: I18nNamespaces
        // 自定义命名空间前缀
        // nsSeparator: '.',
    }
}
