import styles from '@/features/home/home_container.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export const HomeContainer = () => {
  const HomeHeader = () => {
    return (
      <div className={styles.header}>
        <div className={styles.linkArea}>
          <Link href='/register'>登録</Link>
          <Link href='/login'>ログイン</Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>読書記録アプリ</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <HomeHeader />
      <main className={styles.main}>
        <div className={styles.contents}>
          <Image src='/images/logo.png' alt='application logo' width={150} height={150} />
          <div>読書記録アプリ</div>
        </div>
      </main>
    </>
  );
};
