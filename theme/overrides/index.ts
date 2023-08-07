import { Theme } from '@mui/material'
import Typography from './Typography'

/**
 * @name 修改组件默认配置
 */
export default function ComponentsOverrides(theme: Theme) {
    return Object.assign(Typography(theme), theme.components)
}
