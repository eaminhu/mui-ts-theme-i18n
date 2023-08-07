import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest } from 'next'
import { __TOKEN__ } from '@/constant'

export type ServerSideProps = ({ req }: { req: NextApiRequest }) => Promise<any>

export function withAuth<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
    handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
    return async function nextGetServerSidePropsHandlerWrappedWithIronSession(context: GetServerSidePropsContext) {
        const { req, locale } = context
        // 验证页面是否携带token
        if (!req?.cookies?.[__TOKEN__]) {
            const url = !req.url?.startsWith('/_next/data/') ? '?referrer=' + encodeURIComponent(`${req.url}`) : ''
            return {
                redirect: {
                    destination: `${locale !== 'zh-CN' ? `/${locale}` : ''}/login${url}`,
                    statusCode: 302,
                },
            }
        }
        return handler(context)
    }
}

export default withAuth
