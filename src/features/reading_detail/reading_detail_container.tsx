import Head from 'next/head';
import { useEffect, useState } from 'react';
import { RootWrapperComponent } from '../common/components/root_wrapper_component';
import { getReading } from './apis/reading_detail_api';
import { IReading } from '@/features/common/types/common';
import styles from '@/features/reading_detail/reading_detail_container.module.scss';
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
  readingId: number;
}

export const ReadingDetailContainer = (props: IProps) => {
  const { readingId } = props;
  const [readingParam, setReadingParam] = useState<IReading>({
    id: 0,
    bookName: '',
    bookAuthor: '',
    totalPageCount: 0,
    currentPage: 0,
    memo: '',
    dailyProgresses: [],
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { reading, error } = await getReading(readingId);
      if (error) {
        setErrors([error.msg]);
        return;
      }

      setReadingParam(reading);
    })();
  }, []);

  const GraphComponent = () => {
    const xDates = readingParam.dailyProgresses.map(dp =>
      format(new Date(dp.readDate), 'yyyy-MM-dd'),
    );
    const yPages = readingParam.dailyProgresses.map(dp => dp.readPage);

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
              max: Math.min(readingParam.totalPageCount, Math.max(...yPages) + 10),
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

  return (
    <>
      <Head>
        <title>読書記録アプリ - 読書記録詳細</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <RootWrapperComponent>
        {errors.length !== 0 && (
          <div className={styles.errors}>
            {errors.map((errorText, idx) => (
              <div key={idx}>{errorText}</div>
            ))}
          </div>
        )}
        <div>
          <div>タイトル</div>
          <div>{readingParam.bookName}</div>
        </div>
        <div>
          <div>著者</div>
          <div>{readingParam.bookAuthor}</div>
        </div>
        <GraphComponent />
      </RootWrapperComponent>
    </>
  );
};
