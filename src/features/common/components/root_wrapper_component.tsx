import Link from 'next/link';
import React from 'react';
import styles from '@/features/common/components/root_wrapper_component.module.scss';

export const RootWrapperComponent = (props: React.PropsWithChildren) => {
  const { children } = props;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.linkArea}>
          <Link className={styles.link} href='/register'>
            登録
          </Link>
          <Link className={styles.link} href='/login'>
            ログイン
          </Link>
        </div>
      </div>
      <main className={styles.main}>{children}</main>
    </>
  );
};
