import { useEffect, useState } from 'react';
import { getReading, postDailyProgress } from './apis/reading_detail_api';
import { IReading } from '@/features/common/types/common';
import styles from '@/features/reading_detail/reading_detail_container.module.scss';
import { ProgressGraphComponent } from './components/progress_graph_component';
import { format } from 'date-fns';

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

  const DailyProgressCreateComponent = () => {
    const [newProgressDate, setNewProgressDate] = useState<string>(
      format(new Date(), 'yyyy-MM-dd'),
    );
    const [newProgressPage, setNewProgressPage] = useState<string>('');

    const sendNewProgress = async () => {
      const { newProgressPageNum, errors } = validateNewProgress();
      if (errors.length > 0) {
        setErrors(errors);
        return;
      }

      const { dailyProgress, error } = await postDailyProgress(
        readingParam.id,
        newProgressDate,
        newProgressPageNum,
      );
      if (error) {
        const errors = [];
        if (error.msg) errors.push(error.msg);
        if (error.readDate) errors.push(`日付欄: ${error.readDate}`);
        if (error.readPage) errors.push(`ページ番号欄: ${error.readPage}`);
        setErrors(errors);
        return;
      }

      setErrors([]);
      setReadingParam({
        ...readingParam,
        dailyProgresses: [...readingParam.dailyProgresses, dailyProgress],
      });
    };

    const validateNewProgress = () => {
      const errors = [];
      if (
        readingParam.dailyProgresses.length > 0 &&
        new Date(readingParam.dailyProgresses.slice(-1)[0].readDate) >= new Date(newProgressDate)
      ) {
        errors.push('日付欄: 直近で記録した日付より新しい日付を入力してください。');
      }

      const newProgressPageNum = parseInt(newProgressPage);
      if (isNaN(newProgressPageNum)) {
        errors.push('ページ番号欄: 整数値を入力してください。');
      } else if (newProgressPageNum < 1) {
        errors.push('ページ番号欄: 0より大きい値を入力してください。');
      } else if (newProgressPageNum > readingParam.totalPageCount) {
        errors.push('ページ番号欄: 総ページ数以下の値を入力してください。');
      } else if (
        readingParam.dailyProgresses.length > 0 &&
        readingParam.dailyProgresses.slice(-1)[0].readPage >= newProgressPageNum
      ) {
        errors.push('ページ番号欄: 直近で記録したページ番号より大きい値を入力してください。');
      }

      return { newProgressPageNum, errors };
    };

    return (
      <div className={styles.addingContainer}>
        <div className={styles.inputWrapper}>
          <label htmlFor='progressDate' className={styles.label}>
            日付
          </label>
          <input
            className={styles.input}
            type='date'
            name='progressDate'
            id='progressDate'
            value={newProgressDate}
            onChange={e => setNewProgressDate(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor='page' className={styles.label}>
            ページ番号
          </label>
          <input
            className={styles.input}
            type='text'
            name='page'
            id='page'
            value={newProgressPage}
            onChange={e => setNewProgressPage(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={sendNewProgress}>
          追加
        </button>
      </div>
    );
  };

  const readRate = () => {
    const place = 10;
    return (
      Math.floor((readingParam.currentPage / readingParam.totalPageCount) * 100 * place) / place
    );
  };

  const DetailItemComponent = (props: { labelText: string; value: string }) => {
    return (
      <div className={styles.itemContainer}>
        <div>{props.labelText}</div>
        <div className={styles.itemValue}>{props.value}</div>
      </div>
    );
  };

  return (
    <div className={styles.root}>
      {errors.length !== 0 && (
        <div className={styles.errors}>
          {errors.map((errorText, idx) => (
            <div key={idx}>{errorText}</div>
          ))}
        </div>
      )}
      <div className={styles.descriptions}>
        <div className={styles.descriptionCol}>
          <DetailItemComponent labelText='タイトル' value={readingParam.bookName} />
          <DetailItemComponent labelText='著者' value={readingParam.bookAuthor} />
        </div>
        <div className={styles.descriptionCol}>
          <DetailItemComponent labelText='現在のページ' value={`${readingParam.currentPage} p`} />
          <DetailItemComponent labelText='総ページ数' value={`${readingParam.totalPageCount} p`} />
          <DetailItemComponent labelText='読み進めた割合' value={`${readRate()} %`} />
        </div>
      </div>
      <DailyProgressCreateComponent />
      <ProgressGraphComponent reading={readingParam} />
    </div>
  );
};
