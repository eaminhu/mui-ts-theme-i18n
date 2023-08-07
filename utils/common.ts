export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

export const saveToStorage = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.setItem(key, value)
    }
}

export const getFromStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key)
    }
}

export function eventListenerOn<T extends Window | Document | HTMLElement | EventTarget>(
    obj: T | null,
    ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
    if (obj?.addEventListener) {
        obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>))
    }
}

export function eventListenerOff<T extends Window | Document | HTMLElement | EventTarget>(
    obj: T | null,
    ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]
): void {
    if (obj?.removeEventListener) {
        obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>))
    }
}
