import { useRef, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {Box} from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type ColorStop = {
    position: number;
    color: string;
};

type Gradient = ColorStop[];

const pinkGradient: Gradient = [
    { position: 0, color: '#FFA296' },
    { position: 0.5, color: '#FE8596' },
    { position: 1, color: '#FE7096' },
];

const blueGradient: Gradient = [
    { position: 0, color: '#40D1E9' },
    { position: 0.5, color: '#56C5EC' },
    { position: 1, color: '#7CB1F2' },
];

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.random() * 100),
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => Math.random() * 100),
        },
    ],
};

function createGradient(ctx: CanvasRenderingContext2D, area: { left: number; right: number }, colors: Gradient) {
    const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
    colors.forEach((colorStop) => {
        gradient.addColorStop(colorStop.position, colorStop.color);
    });
    return gradient;
}


export default function BarChartCustom() {
    const chartRef = useRef<any>(null);

    useEffect(() => {
        const chart = chartRef.current;

        if (chart) {
            const { ctx, chartArea } = chart;
            if (!chartArea) {
                return;
            }

            const gradient1 = createGradient(ctx, chartArea, pinkGradient);
            const gradient2 = createGradient(ctx, chartArea, blueGradient);

            chart.data.datasets[0].backgroundColor = gradient1;
            chart.data.datasets[1].backgroundColor = gradient2;
            chart.update();
        }
    }, []);

    return <Box style={{flex: 1, height: '400px' }}>
        <Bar ref={chartRef} options={options} data={data} />
    </Box>;
}
