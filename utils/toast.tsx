import * as React from 'react'
import { Alert, AlertTitle } from '@mui/material'
import { OptionsObject, SnackbarMessage, WithSnackbarProps, useSnackbar } from 'notistack'

interface IProps {
    setUseSnackbarRef: (showSnackbar: WithSnackbarProps) => void
}

const InnerSnackbarUtilsConfig: React.FC<IProps> = (props: IProps) => {
    props.setUseSnackbarRef(useSnackbar())
    return null
}

let useSnackbarRef: WithSnackbarProps
const setUseSnackbarRef = (useSnackbarRefProp: WithSnackbarProps) => {
    useSnackbarRef = useSnackbarRefProp
}

export const SnackbarUtilsConfig = () => <InnerSnackbarUtilsConfig setUseSnackbarRef={setUseSnackbarRef} />

const autoHideDuration: any = 3000

const anchorOrigin: any = {
    vertical: 'top',
    horizontal: 'center',
}
const Toast = {
    success(msg: SnackbarMessage, option?: OptionsObject) {
        this.toast(msg, {
            variant: 'success',
            anchorOrigin,
            autoHideDuration,
            ...option,
        })
    },
    warning(msg: SnackbarMessage, option?: OptionsObject) {
        this.toast(msg, {
            variant: 'warning',
            anchorOrigin,
            autoHideDuration,
            ...option,
        })
    },
    info(msg: SnackbarMessage, option?: OptionsObject) {
        this.toast(msg, {
            variant: 'info',
            anchorOrigin,
            autoHideDuration,
            ...option,
        })
    },
    error(msg: SnackbarMessage, option?: OptionsObject) {
        this.toast(msg, {
            variant: 'error',
            anchorOrigin,
            autoHideDuration,
            ...option,
        })
    },
    /** websocket消息通知 */
    notice({ title, message }: { title?: string; message: string }, option?: OptionsObject) {
        const noticeToast = useSnackbarRef.enqueueSnackbar('', {
            content: (
                <Alert
                    onClose={() => {
                        useSnackbarRef.closeSnackbar(noticeToast)
                    }}
                    icon={false}
                    sx={(theme) => ({
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.paper,
                        boxShadow: theme.customShadows.z8,
                        border: 'none',
                        maxWidth: {
                            xs: 'auto',
                            sm: '300px',
                        },
                        fontSize: 12,
                        '.MuiAlert-action': {
                            paddingTop: 0,
                            '.MuiButtonBase-root': {
                                width: '28px',
                                height: '28px',
                            },
                            '.MuiSvgIcon-root': {
                                width: '20px',
                                height: '20px',
                                color: theme.palette.grey[600],
                            },
                        },
                    })}
                >
                    {title && (
                        <AlertTitle
                            sx={{
                                fontSize: 14,
                                fontWeight: 600,
                            }}
                        >
                            {title}
                        </AlertTitle>
                    )}
                    {message}
                </Alert>
            ),
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            },
            autoHideDuration: 5000,
            ...option,
        })
    },
    toast(msg: SnackbarMessage, option?: OptionsObject) {
        useSnackbarRef.enqueueSnackbar(msg, option)
    },
}

export default Toast
