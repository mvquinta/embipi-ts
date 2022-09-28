import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { Session, User } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
//import GitHubProvider from 'next-auth/providers/github'
import { prisma } from '@/lib/prisma'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options = {
    providers: [
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
    ],
    pages: {
        signIn: '/signin',
        verifyRequest: '/verifyRequest',
    },

    adapter: PrismaAdapter(prisma),
    database: process.env.DATABASE_URL,
    secret: process.env.SECRET,

    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    debug: true,
    callbacks: {
        session: async ({
            session,
            user,
        }: {
            session: Session
            user: User
        }) => {
            session.user.id = user.id
            return Promise.resolve(session)
        },
    },
}
