import { AppBar, Breakpoint, Container, Toolbar } from '@mui/material'
import Nav from './nav'
import Image from '@/components/Image'

interface HeaderProps {
    maxWidth?: false | Breakpoint | undefined
}

export default function Header({ maxWidth }: HeaderProps) {
    return (
        <AppBar>
            <Toolbar
                sx={() => ({
                    padding: 1,
                })}
            >
                <Container className="flex items-center justify-between" maxWidth={maxWidth}>
                    <div><Image src='/images/logo.png' alt='LOGO' width='30' height='30' /></div>
                    <Nav />
                </Container>
            </Toolbar>
        </AppBar>
    )
}
