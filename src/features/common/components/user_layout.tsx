import Link from 'next/link';
import React from 'react';
import styles from '@/features/common/components/user_layout.module.scss';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface IProps {
  subtitle: string;
}

export const UserLayout = (props: React.PropsWithChildren<IProps>) => {
  const { subtitle, children } = props;
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>{`読書記録アプリ - ${subtitle}`}</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <div className={styles.header}>
        <div className={styles.leftLinkArea}>
          <Link className={styles.link} href={'/readings/create'}>
            新規作成
          </Link>
          <Link className={styles.link} href={'/readings'}>
            一覧
          </Link>
        </div>
        <div className={styles.rightLinkArea}>
          <div className={styles.link} onClick={logout}>
            ログアウト
          </div>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
};
