import type {
    NextPage,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next'
import { useSession, getSession } from 'next-auth/react'
import { getUserProfile, getChild } from '@/lib/data'
import { prisma } from '@/lib/prisma'
import { useRouter } from 'next/router'
import { MainLayout, PrivateSettings } from '@/components/index'
import { Loader } from '@/components/index'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) {
        let user = null
        let child = null
        return {
            props: {
                user,
                child,
            },
        }
    }

    let user = await getUserProfile(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    let child = await getChild(session.user.id, prisma)
    child = JSON.parse(JSON.stringify(child))

    return {
        props: {
            user,
            child,
        },
    }
}

const Settings: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ user, child }) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const loading = status === 'loading'

    if (loading) {
        return <Loader />
    }

    if (!session) {
        router.push('/')
    }

    if (session && !session.user.name) {
        router.push('/onboarding')
    }
    return (
        <>
            <MainLayout user={user} session={session}>
                <PrivateSettings user={user} child={child} />
            </MainLayout>
        </>
    )
}

export default Settings
