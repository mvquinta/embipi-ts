import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart } from '@/components/index'
import { useUtils } from '@/lib/utils'
import { Loader } from '@/components/index'
import { UserChildren } from 'types/types'

type Props = {
    child: UserChildren
    percentileType: string
}

type Response = {
    gender: string
    data: {
        height: number
        weight: number
        head: number
    }
}

export const Charts: NextPage<Props> = ({ percentileType, child }) => {
    const utils = useUtils()
    const [loading, setLoading] = useState<boolean>(false)
    const [percentilesValues, setPercentilesValues] = useState(0)
    const [lineChartPercentil, setLineChartPercentil] = useState([])
    const babyAgeMonths = child ? child[0].userBabyMonths : null

    useEffect(() => {
        const babyGender = child ? child[0].userBabyGender : null
        axios
            .get('/api/percentile')
            .then((response) => {
                response.data.map((res: Response) => {
                    if (res.gender === babyGender) {
                        switch (percentileType) {
                            case 'height':
                                setPercentilesValues(res.data.height)
                                setLoading(false)
                                break
                            case 'weight':
                                setPercentilesValues(res.data.weight)
                                setLoading(false)
                                break
                            case 'head':
                                setPercentilesValues(res.data.head)
                                setLoading(false)
                                break
                            default:
                                console.log(
                                    'The percentil information you are looking for does not exist'
                                )
                                setLoading(false)
                        }
                    }
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }, [child, percentileType])

    useEffect(() => {
        let babyPercentil = null
        let percentilDataArray = null

        switch (percentileType) {
            case 'height':
                babyPercentil = child ? child[0].userBabyHeight : null
                percentilDataArray = utils.getPercentilValue(
                    babyAgeMonths,
                    babyPercentil
                )
                setLineChartPercentil(percentilDataArray)
                break
            case 'weight':
                babyPercentil = child ? child[0].userBabyWeight : null
                percentilDataArray = utils.getPercentilValue(
                    babyAgeMonths,
                    babyPercentil
                )
                setLineChartPercentil(percentilDataArray)
                break
            case 'head':
                babyPercentil = child ? child[0].userBabyHead : null
                percentilDataArray = utils.getPercentilValue(
                    babyAgeMonths,
                    babyPercentil
                )
                setLineChartPercentil(percentilDataArray)
                break
            default:
                console.log(
                    'The percentil information you are looking for does not exist'
                )
        }
    }, [child])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className='relative w-full h-full flex flex-col justify-center items-center md:flex-row md:p-4 '>
                    <div className='relative w-full h-full md:p-2'>
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
    )
}
