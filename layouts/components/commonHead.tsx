import React from 'react'
import Head from 'next/head'

export default function CommonHead() {
    const buildTime = process.env.buildTime
    return (
        <Head>
            <title>PASSTO CREDIT</title>
            <meta name="build-time" content={buildTime} />
            <meta name="keywords" content="PASSTO CREDIT" />
            <meta name="description" content="PASSTO CREDIT" />
        </Head>
    )
}
