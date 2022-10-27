import type { NextPage } from 'next';
import { UserChildren, PercentileCurves } from 'types/types';

type Props = {
    child: UserChildren;
    percentileValues: PercentileCurves[];
};

export const PercentileStats: NextPage<Props> = ({ child, percentileValues }) => {
    const percentileStats = [
        {
            name: 'Height Percentile',
            userBabyStat: child ? child[0]?.userBabyHeight : null,
            stat: percentileValues
                ? percentileValues[0]?.data?.height.curve50[child[0].userBabyMonths]
                : null,
        },
        {
            name: 'Weight Percentile',
            userBabyStat: child ? child[0].userBabyWeight : null,
            stat: percentileValues
                ? percentileValues[0]?.data?.weight.curve50[child[0].userBabyMonths]
                : null,
        },
        {
            name: 'Head Percentile',
            userBabyStat: child ? child[0].userBabyHeight : null,
            stat: percentileValues
                ? percentileValues[0]?.data?.head.curve50[child[0].userBabyMonths]
                : null,
        },
    ];

    return (
        <>
            <div className="mt-8">
                <h3 className="text-lg leading-6 font-medium text-gray-600 mt-5">Percentil</h3>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {percentileStats.map((item) => (
                        <div
                            key={item.name}
                            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                        >
                            <dt className="truncate text-sm font-medium text-gray-500">
                                {item.name}
                            </dt>
                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                                {item.userBabyStat as any}
                            </dd>
                            <dd className="mt-1 text-base font-semibold tracking-tight text-gray-900">
                                WHO: {item.stat}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </>
    );
};
