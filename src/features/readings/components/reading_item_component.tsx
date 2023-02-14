import { IReading } from '@/features/common/types/common';
import styles from '@/features/readings/components/reading_item_component.module.scss';
import Link from 'next/link';

interface IProps {
  reaading: IReading;
}

export const ReadingItemComponent = (props: IProps) => {
  const { id, bookName, bookAuthor, totalPageCount, currentPage } = props.reaading;

  const readRate = () => {
    const place = 10;
    return Math.floor((currentPage / totalPageCount) * 100 * place) / place;
  };

  return (
    <Link href={`/readings/${id}`} className={styles.root}>
      <div className={styles.col}>
        <div>タイトル</div>
        <div className={styles.value}>{bookName}</div>
      </div>
      <div className={styles.col}>
        <div>著者</div>
        <div className={styles.value}>{bookAuthor}</div>
      </div>
      <div className={styles.col}>
        <div>現在のページ / 総ページ数</div>
        <div className={styles.value}>
          {currentPage}p / {totalPageCount}p
        </div>
      </div>
      <div className={styles.col}>
        <div>読み終えた割合</div>
        <div className={styles.value}>{readRate()}%</div>
      </div>
    </Link>
  );
};
