import { useEffect } from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'
import scrollIntoView from 'scroll-into-view-if-needed'

/**
 * @name 将表单错误节点滚动到视图中
 * @example scrollIntoError(document.querySelector('.Mui-error'))
 */
export function scrollIntoError(errorNode = document.querySelector('.Mui-error')) {
    setTimeout(() => {
        if (errorNode) {
            scrollIntoView(errorNode, {
                block: 'center',
                behavior: 'smooth',
            })
        }
    }, 20)
}

/**
 * @name 表单滚动条滚动到错误字段dom节点
 */
export default function useScrollIntoError(errors: FieldErrors<FieldValues>) {
    useEffect(() => {
        if (Object.values(errors).length) {
            scrollIntoError()
        }
    }, [errors])
}
