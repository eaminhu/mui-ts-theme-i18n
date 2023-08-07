import { useCallback, useState } from 'react'
import writeText from 'copy-to-clipboard'

export interface CopyToClipboardState {
    value?: string
    noUserInteraction: boolean
    error?: Error
}

const useCopyToClipboard = (): [CopyToClipboardState, (value: string) => void] => {
    const [state, setState] = useState<CopyToClipboardState>({
        value: undefined,
        error: undefined,
        noUserInteraction: true,
    })

    const copyToClipboard = useCallback(
        (value: string | number) => {
            let noUserInteraction
            let normalizedValue
            try {
                normalizedValue = value.toString()
                noUserInteraction = writeText(normalizedValue)
                setState({
                    value: normalizedValue,
                    error: undefined,
                    noUserInteraction,
                })
            } catch (error: any) {
                setState({
                    value: normalizedValue,
                    error,
                    noUserInteraction: Boolean(noUserInteraction),
                })
            }
        },
        [setState],
    )

    return [state, copyToClipboard]
}

export default useCopyToClipboard
