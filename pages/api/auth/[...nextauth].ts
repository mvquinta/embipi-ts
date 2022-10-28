import { NextApiHandler } from 'next';
import NextAuth, { Session, User } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { EmailSignin } from './emailSignin';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
    providers: [
        //##When using mailtrap for development in local##
        // EmailProvider({
        //     server: process.env.EMAIL_SERVER,
        //     from: process.env.EMAIL_FROM,
        // }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: Number(process.env.EMAIL_SERVER_PORT),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest({ identifier, url, provider }) {
                EmailSignin({ identifier, url, provider });
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
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
        session: async ({ session, user }: { session: Session; user: User }) => {
            session.user.id = user.id;
            return Promise.resolve(session);
        },
    },
};
