import { useCallback, useEffect } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress'
import { eventListenerOff, eventListenerOn } from '@/utils'

/**
 * 当用户尝试重新加载或关闭页面时显示浏览器警告弹窗
 * @param enabled - 是否开启
 * @param message - 警告消息
 */
const useBeforeUnload = (enabled: boolean | (() => boolean) = true, message?: string) => {
    const handler = useCallback(
        (event: BeforeUnloadEvent) => {
            const finalEnabled = typeof enabled === 'function' ? enabled() : true

            if (!finalEnabled) {
                return
            }

            event.preventDefault()

            if (message) {
                event.returnValue = message
            }

            return message
        },
        [enabled, message],
    )

    useEffect(() => {
        if (!enabled) {
            return
        }

        eventListenerOn(window, 'beforeunload', handler)

        return () => eventListenerOff(window, 'beforeunload', handler)
    }, [enabled, handler])
}

/**
 * @name 监听用户next跳转和用户尝试重新加载或关闭页面时，显示浏览器警告弹窗
 */
const useLeavePageConfirm = (isConfirm = true, message?: string) => {
    const _message = message || '系统可能不会保存您所做的更改。确定要离开吗？'
    useBeforeUnload(isConfirm, _message)

    useEffect(() => {
        const handler = () => {
            if (isConfirm && !window.confirm(_message)) {
                NProgress.done()
                throw 'Route Canceled'
            }
        }

        Router.events.on('beforeHistoryChange', handler)

        return () => {
            Router.events.off('beforeHistoryChange', handler)
        }
    }, [isConfirm, _message])
}

export default useLeavePageConfirm
