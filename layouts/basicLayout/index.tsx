import React from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Footer from '@/layouts/components/footer'
import CommonHead from '../components/commonHead'
import Header from '../components/header'

interface IMeta {
    title?: string
    keywords?: string
    description?: string
}

interface BasicLayoutProps {
    children: React.ReactNode
    style?: React.CSSProperties
    meta?: IMeta
    footer?: boolean // 是否需要底部
}

const Main = styled(Box)<BoxProps>(() => ({
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
}))

const MainContent = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    flex: '1 1 0%',
    padding: '64px 0',
    flexDirection: 'column',
}))

export const BasicLayout = (props: BasicLayoutProps) => {
    const { children, footer = true, ...rest } = props

    return (
        <Main {...rest}>
            <CommonHead />
            <Header />
            <MainContent component="main">{children}</MainContent>

            {footer && <Footer />}
        </Main>
    )
}

export default BasicLayout
