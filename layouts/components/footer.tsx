import React from 'react'
import { Breakpoint, Container } from '@mui/material'
import Box from '@mui/material/Box'

interface FooterProps {
    maxWidth?: false | Breakpoint | undefined
}

export default function Footer({ maxWidth }: FooterProps) {
    return (
        <Box>
            <Container className="bg-stone-700 text-warning-main p-4 flex w-full justify-center" maxWidth={false}>
                Footer
            </Container>
        </Box>
    )
}
