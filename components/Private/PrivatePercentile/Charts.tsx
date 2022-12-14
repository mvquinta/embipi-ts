import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '@/components/index';
import { useUtils } from '@/lib/utils';
import { Loader } from '@/components/index';
import { Prisma } from '@prisma/client';
import { UserChildren } from 'types/types';

type Props = {
    child: UserChildren;
    percentileType: string;
};

type Response = {
    gender: string;
    data: {
        height: Prisma.Decimal;
        weight: Prisma.Decimal;
        head: Prisma.Decimal;
    };
};

export const Charts: NextPage<Props> = ({ percentileType, child }) => {
    const utils = useUtils();
    const [loading, setLoading] = useState<boolean>(false);
    const [percentilesValues, setPercentilesValues] = useState<Prisma.Decimal | number>(0);
    const [lineChartPercentil, setLineChartPercentil] = useState<Array<number | null>>([]);
    const babyAgeMonths = child ? child[0].userBabyMonths : 0;

    useEffect(() => {
        const babyGender = child ? child[0].userBabyGender : null;
        axios
            .get('/api/percentile')
            .then((response) => {
                response.data.map((res: Response) => {
                    if (res.gender === babyGender) {
                        switch (percentileType) {
                            case 'height':
                                setPercentilesValues(res.data.height);
                                setLoading(false);
                                break;
                            case 'weight':
                                setPercentilesValues(res.data.weight);
                                setLoading(false);
                                break;
                            case 'head':
                                setPercentilesValues(res.data.head);
                                setLoading(false);
                                break;
                            default:
                                console.log(
                                    'The percentil information you are looking for does not exist',
                                );
                                setLoading(false);
                        }
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [child, percentileType]);

    useEffect(() => {
        let babyPercentil: Prisma.Decimal | number = 0;
        let percentilDataArray = [];

        switch (percentileType) {
            case 'height':
                babyPercentil = child ? child[0].userBabyHeight : 0.0;
                percentilDataArray = utils.getPercentilValue(babyAgeMonths, babyPercentil);
                setLineChartPercentil(percentilDataArray);
                break;
            case 'weight':
                babyPercentil = child ? child[0].userBabyWeight : 0.0;
                percentilDataArray = utils.getPercentilValue(babyAgeMonths, babyPercentil);
                setLineChartPercentil(percentilDataArray);
                break;
            case 'head':
                babyPercentil = child ? child[0].userBabyHead : 0.0;
                percentilDataArray = utils.getPercentilValue(babyAgeMonths, babyPercentil);
                setLineChartPercentil(percentilDataArray);
                break;
            default:
                console.log('The percentil information you are looking for does not exist');
        }
    }, [child]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="relative w-full h-full flex flex-col justify-center items-center md:flex-row md:p-4 ">
                    <div className="relative w-full h-full md:p-2">
                        <LineChart
                            babyName={child ? child[0].userBabyName : null}
                            babyMonths={lineChartPercentil}
                            curveValues={percentilesValues}
                            chartTitle={percentileType}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
