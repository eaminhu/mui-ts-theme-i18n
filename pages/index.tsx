import React from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container } from '@mui/material'
import { BasicLayout } from '@/layouts'

function Home() {
    const { t } = useTranslation(['common'])
    return (
        <BasicLayout>
            <Container className="pt-20 flex justify-center">{t('home.text', { ns: 'common' })}</Container>
        </BasicLayout>
    )
}

export const getStaticProps: GetStaticProps = async (req) => ({
    props: {
        ...(await serverSideTranslations(`${req.locale}`, ['common'])),
    },
})

export default Home
