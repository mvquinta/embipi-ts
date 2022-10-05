import type { NextPage } from 'next'
import { UserChildren } from 'types/types'
import { PercentileCharts, PercentileFaqs } from '@/components/index'

type Props = {
    child: UserChildren
}
export const PrivatePercentile: NextPage<Props> = ({ child }) => {
    return (
        <>
            <div className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-9'>
                {/* Section Heading */}
                <div className='pb-5 border-b border-gray-200'>
                    <h3 className='ml-2 mt-2 text-3xl leading-6 font-medium text-gray-900'>
                        Percentile
                    </h3>
                    <p className='ml-2 mt-1 text-sm text-gray-500 truncate'>
                        Detailed view
                    </p>
                </div>
                {/* Section Charts */}
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <PercentileCharts child={child} />
                </div>
                {/* Section Faqs */}
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <PercentileFaqs />
                </div>
            </div>
        </>
    )
}
