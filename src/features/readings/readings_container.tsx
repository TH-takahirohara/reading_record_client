import styles from '@/features/readings/readings_container.module.scss';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getReadings } from './apis/readings_api';
import { IReading } from '../common/types/common';
import { ReadingItemComponent } from './components/reading_item_component';

export const ReadingsContainer = () => {
  const [readings, setReadings] = useState<IReading[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { metadata, readings, error } = await getReadings(currentPage + 1);
      if (error) {
        const errors = [];
        if (error.msg) errors.push(error.msg);
        if (error.page) errors.push(error.page);
        if (error.pageSize) errors.push(error.pageSize);
        setErrors(errors);
        return;
      }

      setReadings(readings);
      setPageCount(metadata.lastPage);
    })();
  }, [currentPage]);

  const ReadingsComponent = () => {
    return (
      <>
        {readings.length > 0 &&
          readings.map(r => {
            return <ReadingItemComponent reaading={r} />;
          })}
      </>
    );
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
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
      <ReadingsComponent />
      <ReactPaginate
        className={styles.paginate}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        previousLabel='<'
        nextLabel='>'
        activeClassName={styles.active}
        breakLabel='...'
      />
    </div>
  );
};
