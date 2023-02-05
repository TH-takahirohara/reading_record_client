import styles from '@/features/register/register_container.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { postUser } from './apis/register_api';

export const RegisterContainer = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const register = async () => {
    const { user, error } = await postUser(name, email, password);
    console.log(user);
    console.log(error);
  };

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
            <input
              type='text'
              name='name'
              id='name'
              className={styles.input}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='email' className={styles.label}>
              メールアドレス
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className={styles.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='password' className={styles.label}>
              パスワード
            </label>
            <input
              type='password'
              name='password'
              id='password'
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.button} onClick={register}>
            登録
          </button>
        </div>
      </main>
    </>
  );
};
