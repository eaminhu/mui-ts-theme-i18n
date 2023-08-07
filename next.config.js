const { i18n } = require('./next-i18next.config')

process.env.buildTime = new Date().toLocaleString()

const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    cleanDistDir: false,
    i18n,
    publicRuntimeConfig: {
        isTest: process.env.IS_TEST || 0,
    },
    env: {
        COMPANY_ID: process.env.COMPANY_ID,
        API_URL: process.env.API_URL,
        PK: process.env.PK,
        ENCRYPT: process.env.ENCRYPT,
        buildTime: process.env.buildTime,
    },
    images: {
        domains: ['cats2.oss-cn-hongkong.aliyuncs.com'],
    },
    async headers() {
        return [
            {
                source: '/images/(.*).(jpg|png|ico)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=900, immutable',
                    },
                ],
            },
            {
                source: '/fonts/(.*).(woff2|eot|ttf|svg|css)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.API_URL + '/:path*',
            },
            // {
            //     source: '/api/cats-gateway/:path*',
            //     destination: process.env.API_URL + '/cats-gateway/:path*',
            // },
        ]
    },
    webpack(config) {
        // @ts-ignore

        config.resolve.alias = {
            ...config.resolve.alias,
            '@': __dirname,
            public: `${__dirname}/public/`,
        }
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        }
        return config
    },
}

module.exports = nextConfig
