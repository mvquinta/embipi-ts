import type {
    NextPage,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from 'next'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { MainLayout, Welcomebar } from '@/components/index'
import { getUserProfile, getChild, getMilestones } from '@/lib/data'
import { prisma } from '@/lib/prisma'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session) {
        let user = null
        let child = null
        let milestones = null
        return {
            props: {
                user,
                child,
                milestones,
            },
        }
    }

    let user = await getUserProfile(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    let child = await getChild(session.user.id, prisma)
    child = JSON.parse(JSON.stringify(child))

    let milestones = await getMilestones(child[0].id, prisma)
    milestones = JSON.parse(JSON.stringify(milestones))

    return {
        props: {
            user,
            child,
            milestones,
        },
    }
}

const Private: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({
    user,
    child,
    milestones,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    const { data: session, status } = useSession()

    const loading = status === 'loading'

    if (loading) {
        return null
    }

    if (!session) {
        router.push('/')
    }

    return (
        <>
            <MainLayout user={user} session={session}>
                {/* <Welcomebar /> */}
                {/* <PrivateDashboard /> */}
                <Welcomebar user={user} child={child} />
                <h2>Private Dashboard component</h2>
            </MainLayout>
        </>
    )
}

export default Private
