import { IReading } from '@/features/common/types/common';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

interface IProps {
  reading: IReading;
}

export const ProgressGraphComponent = (props: IProps) => {
  const { reading } = props;
  const xDates = reading.dailyProgresses.map(dp => format(new Date(dp.readDate), 'yyyy-MM-dd'));
  const yPages = reading.dailyProgresses.map(dp => dp.readPage);

  return (
    <Line
      data={{
        labels: xDates,
        datasets: [
          {
            data: yPages,
            borderWidth: 1,
            backgroundColor: '#66CC33',
            borderColor: '#66CC33',
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              displayFormats: {
                day: 'yyyy-MM-dd',
              },
              unit: 'day',
            },
            offset: true,
          },
          y: {
            beginAtZero: true,
            max: Math.min(reading.totalPageCount, Math.max(...yPages) + 10),
            title: {
              display: true,
              text: 'ページ数',
            },
          },
        },
      }}
      height={50}
      width={100}
    />
  );
};
