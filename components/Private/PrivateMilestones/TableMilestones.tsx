import type { NextPage } from 'next';
import { ActiveMilestone } from 'types/types';
import { BiChevronDown } from 'react-icons/bi';
import { MilestonesDropdown } from '@/components/index';

type Props = {
    activeMilestones: ActiveMilestone[];
    handleUpdateMilestoneStatus: (event: React.MouseEvent<HTMLSpanElement>) => Promise<void>;
    handleMonthDropDown: (month: string) => void;
    activeMonthToShow: string;
};

const statusStyles = {
    success: 'bg-green-100 text-green-800',
    //almost: "bg-yellow-100 text-yellow-800",
    developing: 'bg-yellow-100 text-yellow-800',
};

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

export const TableMilestones: NextPage<Props> = ({
    activeMilestones,
    handleUpdateMilestoneStatus,
    handleMonthDropDown,
    activeMonthToShow,
}) => {
    return (
        <>
            <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                <span>
                    {
                        <MilestonesDropdown
                            handleMonthDropDown={handleMonthDropDown}
                            activeMonthToShow={activeMonthToShow}
                        />
                    }
                </span>
            </h2>

            <div className="block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col mt-2">
                        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            scope="col"
                                        >
                                            Milestone
                                        </th>
                                        <th
                                            className="hidden md:table-cell px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            scope="col"
                                        >
                                            Type
                                        </th>

                                        <th
                                            className="hidden md:table-cell px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                            scope="col"
                                        >
                                            Accomplished
                                        </th>
                                        <th
                                            className="hidden md:table-cell px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            scope="col"
                                        >
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {activeMilestones?.map((transaction) => (
                                        <tr key={transaction.id} className="bg-white">
                                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div>
                                                    <p className="text-gray-500 truncate group-hover:text-gray-900">
                                                        {transaction.text}
                                                    </p>
                                                </div>
                                                <div className="sm:block md:hidden my-2">
                                                    <p className="text-gray-500 truncate group-hover:text-gray-900">
                                                        {transaction.type}
                                                    </p>
                                                </div>
                                                <div className="sm:block md:hidden cursor-pointer my-2">
                                                    <span
                                                        className={classNames(
                                                            statusStyles[
                                                                transaction.status === true
                                                                    ? 'success'
                                                                    : 'developing'
                                                            ],
                                                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                                                        )}
                                                        onClick={(event) =>
                                                            handleUpdateMilestoneStatus(event)
                                                        }
                                                        id={transaction.id.toString()}
                                                    >
                                                        {transaction.status === true
                                                            ? 'success'
                                                            : 'developing'}
                                                    </span>
                                                </div>
                                                <div className="sm:block md:hidden">
                                                    <time dateTime={transaction.date?.toString()}>
                                                        {transaction.date === null
                                                            ? '---'
                                                            : transaction.date.toString()}
                                                    </time>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                <p className="text-gray-500 truncate group-hover:text-gray-900">
                                                    {transaction.type}
                                                </p>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                                                <span
                                                    className={classNames(
                                                        statusStyles[
                                                            transaction.status === true
                                                                ? 'success'
                                                                : 'developing'
                                                        ],
                                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                                                    )}
                                                    onClick={(event) =>
                                                        handleUpdateMilestoneStatus(event)
                                                    }
                                                    id={transaction.id.toString()}
                                                >
                                                    {transaction.status === true
                                                        ? 'success'
                                                        : 'developing'}
                                                </span>
                                            </td>
                                            <td className="hidden md:table-cell px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                                                <time dateTime={transaction.date?.toString()}>
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
    );
};

export default TableMilestones;
