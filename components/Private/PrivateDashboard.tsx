import { Welcomebar } from '@/components/index'
import type { NextPage } from 'next'
import { UserProfile, UserChildren } from '../../types/types'

//import ChartsPercentileDash from "components/PrivateDashboard/ChartsPercentileDash";
//import Milestones from "components/Milestones/index";

type Props = {
    user: UserProfile
    child: UserChildren
    // milestones: ?
    // monthToShow: ?
}

export const PrivateDashboard: NextPage<Props> = ({
    user,
    child,
    // milestones,
    // monthToShow,
}) => {
    return (
        <>
            <main className='flex-1 pb-8'>
                <Welcomebar user={user} child={child} />
                <div className='mt-8'>
                    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <h2 className='text-lg leading-6 font-medium text-gray-900'>
                            Overview
                        </h2>
                        {/* <ChartsPercentileDash child={child} />
            <Milestones
              child={child}
              milestones={milestones}
              monthToShow={monthToShow}
            /> */}
                    </div>
                </div>
            </main>
        </>
    )
}
