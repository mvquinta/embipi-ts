import type { NextPage } from 'next'
import { UserChildren } from 'types/types'

import { BiCuboid, BiCubeAlt, BiCube } from 'react-icons/bi'
import { Charts } from '@/components/index'

type Props = {
    child: UserChildren
}

export const PercentileCharts: NextPage<Props> = ({ child }) => {
    const cards = [
        {
            name: 'Height Percentile (WHO)',
            href: '#',
            icon: BiCuboid,
            percentil: child ? `${child[0].userBabyHeight} cm` : '... cm',
            percentileType: 'height',
        },
        {
            name: 'Weight Percentile (WHO)',
            href: '#',
            icon: BiCubeAlt,
            percentil: child ? `${child[0].userBabyWeight} kg` : '... kg',
            percentileType: 'weight',
        },
        {
            name: 'Head Percentile (WHO)',
            href: '#',
            icon: BiCube,
            percentil: child ? `${child[0].userBabyHead} cm` : '... cm',
            percentileType: 'head',
        },
    ]
    return (
        <>
            <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {/* Card */}
                {cards.map((card) => (
                    <div
                        key={card.name}
                        className='bg-white overflow-hidden shadow rounded-lg'>
                        <div className='p-5'>
                            <div className='flex items-center'>
                                <div className='flex-shrink-0'>
                                    <card.icon
                                        className='h-6 w-6 text-gray-400'
                                        aria-hidden='true'
                                    />
                                </div>
                                <div className='ml-5 w-0 flex-1'>
                                    <dl>
                                        <dt className='text-sm font-medium text-gray-500 truncate'>
                                            {card.name}
                                        </dt>
                                        <dd>
                                            <div className='text-lg font-medium text-gray-900'>
                                                {card.percentil}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className='bg-gray-50 px-5 py-3'>
                            <Charts
                                percentileType={card.percentileType}
                                child={child}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
