import styles from '@/features/home/home_container.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import { RootWrapperComponent } from '../common/components/root_wrapper_component';

export const HomeContainer = () => {
  return (
    <>
      <Head>
        <title>読書記録アプリ</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <RootWrapperComponent>
        <div className={styles.contents}>
          <Image src='/images/logo.png' alt='application logo' width={150} height={150} />
          <div>読書記録アプリ</div>
        </div>
      </RootWrapperComponent>
    </>
  );
};
