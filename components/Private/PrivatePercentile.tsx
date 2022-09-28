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

export const PrivatePercentile: NextPage<Props> = ({
    user,
    child,
    // milestones,
    // monthToShow,
}) => {
    return (
        <>
            <main className='flex-1 pb-8'>Percentile</main>
        </>
    )
}
