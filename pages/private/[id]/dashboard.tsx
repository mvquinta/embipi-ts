import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MainLayout } from '@/components/index';
import { getUserProfile, getChild, getMilestones, getPercentileValues } from '@/lib/data';
import { prisma } from '@/lib/prisma';
import { PrivateDashboard, Loader } from '@/components/index';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) {
        let user = null;
        let child = null;
        let milestones = null;
        return {
            props: {
                user,
                child,
                milestones,
            },
        };
    }

    let user = await getUserProfile(session.user.id, prisma);
    user = JSON.parse(JSON.stringify(user));

    let child = await getChild(session.user.id, prisma);
    child = JSON.parse(JSON.stringify(child));

    let milestones = await getMilestones(child[0].id, prisma);
    milestones = JSON.parse(JSON.stringify(milestones));

    let percentileValues = await getPercentileValues(child[0].userBabyGender, prisma);
    percentileValues = JSON.parse(JSON.stringify(percentileValues));

    return {
        props: {
            user,
            child,
            milestones,
            percentileValues,
        },
    };
};

const Dashboard: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
    user,
    child,
    milestones,
    percentileValues,
}) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    const loading = status === 'loading';

    if (loading) {
        return <Loader />;
    }

    if (!session) {
        router.push('/');
    }

    return (
        <>
            <MainLayout user={user} session={session}>
                <PrivateDashboard
                    user={user}
                    child={child}
                    percentileValues={percentileValues}
                    milestones={milestones}
                />
            </MainLayout>
        </>
    );
};

export default Dashboard;
