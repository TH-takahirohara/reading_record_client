import styles from '@/features/readings/readings_container.module.scss';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { RootWrapperComponent } from '../common/components/root_wrapper_component';
import ReactPaginate from 'react-paginate';
import { getReadings } from './apis/readings_api';
import { IReading } from '../common/types/common';

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
            return (
              <>
                <div>{r.bookName}</div>
                <div>{r.bookAuthor}</div>
              </>
            );
          })}
      </>
    );
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <>
      <Head>
        <title>読書記録アプリ - 読書記録一覧</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <RootWrapperComponent>
        <>
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
        </>
      </RootWrapperComponent>
    </>
  );
};
