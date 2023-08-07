import * as React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { IconButton, Stack } from '@mui/material'
import { useThemeMode } from '@/hooks'
import LocalesPopover from './popover/localesPopover'

function Nav() {
    const { mode, toggleThemeMode } = useThemeMode()
    return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
            <LocalesPopover />
            <IconButton sx={{ width: 40, height: 40 }} onClick={toggleThemeMode}>
                {mode === 'dark' ? <Brightness7Icon sx={{ fontSize: 20 }} /> : <Brightness4Icon sx={{ fontSize: 20 }} />}
            </IconButton>
        </Stack>
    )
}

export default Nav
