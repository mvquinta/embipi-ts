import { NextPage } from 'next';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineProps {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
}

interface MyLineProps extends LineProps {}

type Props = {
    babyName: string | null;
    babyMonths: any;
    curveValues: any;
    chartTitle: string;
};

export const LineChart: NextPage<Props> = ({ babyName, babyMonths, curveValues, chartTitle }) => {
    const labels = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];

    const options: LineProps['options'] = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: false,
                text: `Percentil ${chartTitle.toUpperCase()}`,
            },
        },
        scales: {
            y: {
                grid: {
                    borderColor: 'red',
                    display: true,
                },
                display: true,
                max: curveValues ? Math.round(curveValues.curve99[35] / 5) * 5 : 0, //get last value from last curve to set Y max scale Math.round(x/5)*5 -> round up to a multiple of 5
                min: curveValues ? Math.round(curveValues.curve0[0] / 5) * 5 : 0, //get first value from first curve to set Y min scale Math.round(x/5)*5 -> round up to a multiple of 5
                beginAtZero: true,
                ticks: {
                    display: true,
                    align: 'center',
                    padding: 2,
                    backdropColor: 'rgba(255, 255, 255, 0.75)',
                    stepSize: 5,
                },
            },
        },
    };

    const data: LineProps['data'] = {
        labels,
        datasets: [
            {
                label: babyName as string,
                data: babyMonths,
                borderColor: 'rgba(175, 255, 60, 1)',
                backgroundColor: 'rgba(175, 255, 60, 1)',
                pointRadius: 7,
            },
            {
                label: 'Curve 0',
                data: curveValues ? curveValues.curve0 : null,
                borderColor: 'rgba(255, 165, 0, 0.75)',
                backgroundColor: 'rgba(255, 165, 0, 0.75)',
                pointRadius: 0,
            },
            {
                label: 'Curve 3',
                data: curveValues ? curveValues.curve3 : null,
                borderColor: 'rgba(50, 210, 255, 0.75)',
                backgroundColor: 'rgba(50, 210, 255, 0.75)',
                pointRadius: 0,
            },
            {
                label: 'Curve 15',
                data: curveValues ? curveValues.curve15 : null,
                borderColor: 'rgba(240, 120, 255, 0.75)',
                backgroundColor: 'rgba(240, 120, 255, 0.75)',
                pointRadius: 0,
            },
            {
                label: 'Curve 50',
                data: curveValues ? curveValues.curve50 : null,
                borderColor: 'rgba(255, 60, 60, 0.75)',
                backgroundColor: 'rgba(255, 60, 60, 0.75)',
                pointRadius: 0,
            },
            {
                label: 'Curve 85',
                data: curveValues ? curveValues.curve85 : null,
                borderColor: 'rgba(240, 120, 255, 0.75)',
                backgroundColor: 'rgba(240, 120, 255, 0.75)',
                pointRadius: 0,
            },
            {
                label: 'Curve 97',
                data: curveValues ? curveValues.curve97 : null,
                borderColor: 'rgba(50, 210, 255, 0.75)',
                backgroundColor: 'rgba(50, 210, 255, 0.75)',
                pointRadius: 0,
            },
            {
                label: 'Curve 99',
                data: curveValues ? curveValues.curve99 : null,
                borderColor: 'rgba(255, 165, 0, 0.75)',
                backgroundColor: 'rgba(255, 165, 0, 0.75)',
                pointRadius: 0,
            },
        ],
    };

    return (
        // <div className="relative w-full h-full">
        <div className="w-full h-full">
            <Line options={options} data={data} />
        </div>
    );
};
