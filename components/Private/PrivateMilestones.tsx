import type { NextPage } from 'next'
import { UserProfile, UserChildren, UserMilestones } from '../../types/types'
import { Milestones } from '@/components/index'

//import ChartsPercentileDash from "components/PrivateDashboard/ChartsPercentileDash";
//import Milestones from "components/Milestones/index";

type Props = {
    user: UserProfile
    child: UserChildren
    milestones: UserMilestones
}

export const PrivateMilestones: NextPage<Props> = ({
    user,
    child,
    milestones,
}) => {
    return (
        <>
            <div className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-9'>
                {/* Section Heading */}
                <div className='pb-5 border-b border-gray-200'>
                    <h3 className='ml-2 mt-2 text-3xl leading-6 font-medium text-gray-900'>
                        Milestones
                    </h3>
                    <p className='ml-2 mt-1 text-sm text-gray-500 truncate'>
                        Detailed view
                    </p>
                </div>
                {/* Section Table Milestones */}
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <Milestones
                        child={child ? child : null}
                        milestones={milestones ? milestones : null}
                    />
                    {/* {JSON.stringify(user)}
                    {JSON.stringify(child)}
                    {JSON.stringify(milestones)} */}
                </div>
                {/* Section Tips for parents */}
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'></div>
                {/* Section Notes */}
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'></div>
            </div>
        </>
    )
}
