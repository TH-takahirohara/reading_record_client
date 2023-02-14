import Link from 'next/link';
import React from 'react';
import styles from '@/features/common/components/user_layout.module.scss';
import Head from 'next/head';

interface IProps {
  subtitle: string;
}

export const UserLayout = (props: React.PropsWithChildren<IProps>) => {
  const { subtitle, children } = props;
  return (
    <>
      <Head>
        <title>{`読書記録アプリ - ${subtitle}`}</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <div className={styles.header}>
        <div className={styles.leftLinkArea}>
          <Link href={'/readings/create'}>新規作成</Link>
          <Link href={'/readings'}>一覧</Link>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};
