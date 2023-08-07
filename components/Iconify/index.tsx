import { Icon } from '@iconify/react'
import { forwardRef } from 'react'
import React from 'react'
import { Box, BoxProps } from '@mui/material'

interface IconifyProps extends BoxProps {
    icon: string
}

/**
 * icon组件使用iconify图标
 * @link iconify文档：https://iconify.design/sponsors/
 */
const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: IconifyProps, ref) => (
    <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
))

export default Iconify
