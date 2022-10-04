import type { NextPage } from 'next'
import { BiChevronDown } from 'react-icons/bi'
import MilestonesDropdown from '@/components/Milestones/MilestonesDropdown'

type ActiveMilestone = {
    id: number
    date: null | string
    text: string
    type: string
    status: boolean
}

type ActiveMilestoneArray = Array<ActiveMilestone>

type Props = {
    activeMilestones: ActiveMilestoneArray
    handleUpdateMilestoneStatus: (
        event: React.MouseEvent<HTMLSpanElement>
    ) => Promise<void>
    handleMonthDropDown: (month: string) => void
    activeMonthToShow: string
}

const statusStyles = {
    success: 'bg-green-100 text-green-800',
    //almost: "bg-yellow-100 text-yellow-800",
    developing: 'bg-yellow-100 text-yellow-800',
}

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
}

const TableMilestones: NextPage<Props> = ({
    activeMilestones,
    handleUpdateMilestoneStatus,
    handleMonthDropDown,
    activeMonthToShow,
}) => {
    return (
        <>
            {/* Milestones Resume Component */}
            <h2 className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
                <span>
                    {
                        <MilestonesDropdown
                            handleMonthDropDown={handleMonthDropDown}
                            activeMonthToShow={activeMonthToShow}
                        />
                    }
                </span>
            </h2>

            {/* Activity list (smallest breakpoint only - mobile) */}
            <div className='shadow sm:hidden'>
                <ul
                    role='list'
                    className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'>
                    {activeMilestones?.map((transaction) => (
                        <li key={transaction.id}>
                            <a
                                href='#'
                                className='block px-4 py-4 bg-white hover:bg-gray-50'>
                                <span className='flex items-center space-x-4'>
                                    <span className='flex-1 flex space-x-2 truncate'>
                                        <span className='flex flex-col text-gray-500 text-sm truncate'>
                                            <span className='truncate'>
                                                {transaction.text}
                                            </span>
                                            {/* <time
                                                dateTime={transaction.datetime}>
                                                {transaction.date}
                                            </time> */}
                                        </span>
                                    </span>
                                    <BiChevronDown
                                        className='flex-shrink-0 h-5 w-5 text-gray-400'
                                        aria-hidden='true'
                                    />
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>

                <nav
                    className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200'
                    aria-label='Pagination'>
                    <div className='flex-1 flex justify-between'>
                        <a
                            href='#'
                            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500'>
                            Previous
                        </a>
                        <a
                            href='#'
                            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500'>
                            Next
                        </a>
                    </div>
                </nav>
            </div>

            {/* Activity table (small breakpoint and up -desktop) */}
            <div className='hidden sm:block'>
                <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-col mt-2'>
                        <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead>
                                    <tr>
                                        <th
                                            className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                            scope='col'>
                                            Milestone
                                        </th>
                                        <th
                                            className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                                            scope='col'>
                                            Type
                                        </th>

                                        <th
                                            className='hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block'
                                            scope='col'>
                                            Accomplished
                                        </th>
                                        <th
                                            className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                                            scope='col'>
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {activeMilestones?.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className='bg-white'>
                                            <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                <div className='flex'>
                                                    <a
                                                        href='#'
                                                        className='group inline-flex space-x-2 truncate text-sm'>
                                                        <p className='text-gray-500 truncate group-hover:text-gray-900'>
                                                            {transaction.text}
                                                        </p>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                                                <p className='text-gray-500 truncate group-hover:text-gray-900'>
                                                    {transaction.type}
                                                </p>
                                            </td>
                                            <td className='hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block cursor-pointer'>
                                                <span
                                                    className={classNames(
                                                        statusStyles[
                                                            transaction.status ===
                                                            true
                                                                ? 'success'
                                                                : 'developing'
                                                        ],
                                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                                                    )}
                                                    onClick={(event) =>
                                                        handleUpdateMilestoneStatus(
                                                            event
                                                        )
                                                    }
                                                    id={transaction.id.toString()}>
                                                    {transaction.status === true
                                                        ? 'success'
                                                        : 'developing'}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                                                <time
                                                    dateTime={transaction.date?.toString()}>
                                                    {transaction.date === null
                                                        ? '---'
                                                        : transaction.date.toString()}
                                                </time>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableMilestones
