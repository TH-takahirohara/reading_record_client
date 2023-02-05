import styles from '@/features/after_registration/after_registration_container.module.scss';
import Head from 'next/head';

export const AfterRegistrationContainer = () => {
  return (
    <>
      <Head>
        <title>読書記録アプリ - 仮登録完了</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <div className={styles.header}></div>
      <main className={styles.main}>
        <p>読書記録アプリの仮登録が完了しました。</p>
        <p>ご登録いただいたメールアドレス宛にメールを送付いたしましたので、</p>
        <p>メールの内容に従い登録ユーザーの有効化操作を行ってください。</p>
      </main>
    </>
  );
};
