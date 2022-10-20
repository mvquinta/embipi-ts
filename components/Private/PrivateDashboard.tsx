import { Welcomebar } from '@/components/index';
import type { NextPage } from 'next';
import { UserProfile, UserChildren, PercentileCurves, UserMilestones } from 'types/types';
import { MilestonesAchievedTable, PercentileStats } from '@/components/index';

type Props = {
    user: UserProfile;
    child: UserChildren;
    percentileValues: PercentileCurves[];
    milestones: UserMilestones;
};

export const PrivateDashboard: NextPage<Props> = ({
    user,
    child,
    percentileValues,
    milestones,
}) => {
    return (
        <>
            <main className="flex-1 pb-8">
                <Welcomebar user={user} child={child} />
                <div className="mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-xl leading-6 font-semibold text-gray-900">Overview</h2>
                        <PercentileStats child={child} percentileValues={percentileValues} />
                        <MilestonesAchievedTable milestones={milestones} />
                    </div>
                </div>
            </main>
        </>
    );
};
