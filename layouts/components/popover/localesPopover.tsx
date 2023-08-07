import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, IconButton, Popover, Stack, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { clearCache } from 'ahooks'
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks'
import { GET_COUNTRY_LIST, LANGUAGE, LANGUAGE_TEXT } from '@/constant'

const { HK, CN, EN } = LANGUAGE

/**
 * @name 多语言选择下拉菜单
 */
export default function LocalesMenu() {
    const localsOptions = {
        [HK]: { icon: '/images/flag/flag-hk.svg', key: HK, text: LANGUAGE_TEXT.HK },
        [CN]: { icon: '/images/flag/flag-cn.svg', key: CN, text: LANGUAGE_TEXT.CN },
        [EN]: { icon: '/images/flag/flag-en.svg', key: EN, text: LANGUAGE_TEXT.EN },
    }
    const popupState = usePopupState({ variant: 'popover', popupId: 'localesPopover' })
    const router = useRouter()
    const { asPath } = router
    const [selectedIndex, setSelectedIndex] = React.useState<LANGUAGE>((router.locale as LANGUAGE) || HK)

    const handleMenuItemClick = (languageKey: LANGUAGE) => {
        setSelectedIndex(languageKey)
        clearCache(GET_COUNTRY_LIST)
        popupState.close()
    }

    return (
        <div>
            <IconButton
                {...bindTrigger(popupState)}
                sx={{
                    padding: 0,
                    width: 40,
                    height: 40,
                }}
            >
                <Box component="img" width={24} src={localsOptions[selectedIndex].icon} alt={localsOptions[selectedIndex].text} />
            </IconButton>
            <Popover
                {...bindMenu(popupState)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Stack spacing={0.75}>
                    {Object.keys(localsOptions).map((localsKey) => {
                        const { icon, text, key } = localsOptions[localsKey as LANGUAGE]
                        return (
                            <Link href={asPath} locale={key} key={key}>
                                <MenuItem selected={key === selectedIndex} onClick={() => handleMenuItemClick(key)}>
                                    <Box component="img" src={icon} width={24} alt={text} className="my-1" mr={2} />
                                    <Typography variant="body2">{text}</Typography>
                                </MenuItem>
                            </Link>
                        )
                    })}
                </Stack>
            </Popover>
        </div>
    )
}
