import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import TableMilestones from '@/components/Milestones/TableMilestones'
import { UserChildren, UserMilestones } from '../../types/types'
import { useUtils } from '@/lib/utils'

type Props = {
    child: UserChildren
    milestones: UserMilestones
}

interface ActiveMilestone {
    id: number
    date: null | string
    text: string
    type: string
    status: boolean
}

interface ActiveMilestoneArray extends Array<ActiveMilestone> {}

export const Milestones: NextPage<Props> = ({ child, milestones }) => {
    const utils = useUtils()
    const [monthToShow, setMonthToShow] = useState(
        utils.getMonthToShow(child) as string
    )
    const [activeMilestones, setActiveMilestones] =
        useState<ActiveMilestoneArray | null>(null)

    useEffect(() => {
        const milestonesObj = milestones?.milestones as object
        setActiveMilestones(
            milestonesObj[monthToShow as keyof typeof milestonesObj]
        )
    }, [monthToShow]) //maybe use monthToShow better than milestones here. Not sure if there might be a problem when refreshing getserversideprops

    const handleMonthDropDown = (month: string) => {
        setMonthToShow(month)
        const milestonesObj = milestones?.milestones as object
        setActiveMilestones(
            milestonesObj[`${month}` as keyof typeof milestonesObj]
        )
    }

    const getMilestonesStatusUpdate = (milestoneId: number) => {
        return activeMilestones?.map((milestone) => {
            if (milestone.id === milestoneId) {
                milestone.status = !milestone.status
                milestone.date =
                    milestone.status === true
                        ? utils.formatDate(new Date())
                        : null
            }
            return milestone
        })
    }

    const handleUpdateMilestoneStatus = async (
        event: React.MouseEvent<HTMLSpanElement>
    ) => {
        const updateMilestones = getMilestonesStatusUpdate(
            parseInt(event.currentTarget.id)
        )
        const childrenId = child[0].id

        async function updateMilestoneStatus() {
            const mile = milestones?.milestones
            try {
                const request = await axios.put('/api/milestones', {
                    childrenId,
                    mile,
                })

                if (request.status < 300) {
                    setActiveMilestones(updateMilestones as ActiveMilestone[])

                    console.log('Success, milestones updated')
                }
            } catch (error) {
                console.log(error)
            }
        }
        updateMilestoneStatus()
    }

    return (
        <>
            <TableMilestones
                activeMilestones={activeMilestones as ActiveMilestoneArray}
                handleUpdateMilestoneStatus={handleUpdateMilestoneStatus}
                handleMonthDropDown={handleMonthDropDown}
                activeMonthToShow={monthToShow}
            />
        </>
    )
}
