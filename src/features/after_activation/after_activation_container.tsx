import styles from '@/features/after_activation/after_activation_container.module.scss';
import Head from 'next/head';
import Link from 'next/link';
import { RootWrapperComponent } from '../common/components/root_wrapper_component';

export const AfterActivationContainer = () => {
  return (
    <>
      <Head>
        <title>読書記録アプリ - アクティベーション完了</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <RootWrapperComponent>
        <div className={styles.contents}>
          <p>読書記録アプリの本登録が完了しました。</p>
          <p>下記リンクからログインしてください。</p>
          <Link href='/login'>ログイン</Link>
        </div>
      </RootWrapperComponent>
    </>
  );
};
