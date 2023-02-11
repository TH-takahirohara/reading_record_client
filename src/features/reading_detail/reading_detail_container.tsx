import Head from 'next/head';
import { useEffect, useState } from 'react';
import { RootWrapperComponent } from '../common/components/root_wrapper_component';
import { getReading } from './apis/reading_detail_api';
import { IReading } from '@/features/common/types/common';
import styles from '@/features/reading_detail/reading_detail_container.module.scss';

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
      </RootWrapperComponent>
    </>
  );
};
