import type { NextPage } from 'next';
import { MilestonesDone, UserMilestones } from 'types/types';
import { useState, useEffect } from 'react';

type Props = {
    milestones: UserMilestones;
};

const milesMonth = [
    '2 Months',
    '4 Months',
    '6 Months',
    '9 Months',
    '12 Months',
    '18 Months',
    '24 Months',
];

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
}

export const MilestonesAchievedTable: NextPage<Props> = ({ milestones }) => {
    const [milesAchieved, setMilesAchieved] = useState<MilestonesDone[] | null>(null);

    useEffect(() => {
        const milestonesData = milestones?.milestones as object;
        let milestonesDone: MilestonesDone[] = [];
        if (milestonesData) {
            Object.entries(milestonesData).map((item) => {
                item[1].map((i: MilestonesDone) => {
                    if (i.status) {
                        milestonesDone.push(i);
                    }
                });
            });
        }

        setMilesAchieved(milestonesDone);
    }, [milestones]);

    const getMonth = (id: number) => {
        let month = '';
        switch (true) {
            case id <= 15:
                month = milesMonth[0];
                break;
            case id >= 16 && id <= 34:
                month = milesMonth[1];
                break;
            case id >= 35 && id <= 50:
                month = milesMonth[2];
                break;
            case id >= 51 && id <= 66:
                month = milesMonth[3];
                break;
            case id >= 67 && id <= 90:
                month = milesMonth[4];
                break;
            case id >= 91 && id <= 110:
                month = milesMonth[5];
                break;
            case id >= 111 && id <= 131:
                month = milesMonth[6];
                break;
            default:
                month = '';
        }

        return month;
    };

    if (milesAchieved === null || !milesAchieved.length) {
        return (
            <>
                <div className="mt-8">
                    <h3 className="text-lg leading-6 font-medium text-gray-600 mt-5">
                        Milestones Achieveds
                    </h3>
                    <div className="-mx-4 mt-8 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Milestone
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                    >
                                        Data
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-4 pl-4 sm:pl-6 pr-3 text-sm">
                                        <div className="font-medium text-red-500">
                                            No milestones achieved yet
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="mt-8">
                <h3 className="text-lg leading-6 font-medium text-gray-600 mt-5">
                    Milestones Achieved
                </h3>
                <div className="-mx-4 mt-8 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                >
                                    Milestone
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                >
                                    Type
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                >
                                    Data
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {milesAchieved?.map((mile, mileIdx) => (
                                <tr key={mile.id}>
                                    <td
                                        className={classNames(
                                            mileIdx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-4 pl-4 sm:pl-6 pr-3 text-sm',
                                        )}
                                    >
                                        <div className="font-medium text-gray-900">{mile.text}</div>
                                        <div className="text-xs font-semibold text-teal-600">
                                            {getMonth(mile.id)}
                                        </div>
                                        <div className="mt-1 text-gray-500 sm:block md:hidden">
                                            <span>{mile.type}</span>
                                        </div>
                                        <div className="mt-1 text-gray-500 sm:block md:hidden">
                                            <span>{mile.date}</span>
                                        </div>
                                        {mileIdx !== 0 ? (
                                            <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                                        ) : null}
                                    </td>
                                    <td
                                        className={classNames(
                                            mileIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-gray-500 md:table-cell',
                                        )}
                                    >
                                        {mile.type}
                                    </td>
                                    <td
                                        className={classNames(
                                            mileIdx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-gray-500 md:table-cell',
                                        )}
                                    >
                                        {mile.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};
