import styles from '@/features/register/register_container.module.scss';
import Head from 'next/head';

export const RegisterContainer = () => {
  return (
    <>
      <Head>
        <title>読書記録アプリ - 登録</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <div className={styles.header}></div>
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.inputWrapper}>
            <label htmlFor='name' className={styles.label}>
              ユーザー名
            </label>
            <input type='text' name='name' id='name' className={styles.input} />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='email' className={styles.label}>
              メールアドレス
            </label>
            <input type='email' name='email' id='email' className={styles.input} />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='password' className={styles.label}>
              パスワード
            </label>
            <input type='password' name='password' id='password' className={styles.input} />
          </div>
          <button className={styles.button}>登録</button>
        </div>
      </main>
    </>
  );
};
