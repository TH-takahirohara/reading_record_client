import styles from '@/features/register/register_container.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { postUser } from './apis/register_api';

export const RegisterContainer = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const register = async () => {
    const { error } = await postUser(name, email, password);
    if (error) {
      const errors = [];
      if (error.msg) errors.push(error.msg);
      if (error.name) errors.push(`ユーザー名： ${error.name}`);
      if (error.email) errors.push(`メールアドレス： ${error.email}`);
      if (error.password) errors.push(`パスワード： ${error.password}`);
      setErrors(errors);
      return;
    }

    router.push('/after_registration');
  };

  return (
    <>
      <Head>
        <title>読書記録アプリ - 登録</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <div className={styles.header}></div>
      <main className={styles.main}>
        {errors.length !== 0 && (
          <div className={styles.errors}>
            {errors.map((errorText, idx) => (
              <div key={idx}>{errorText}</div>
            ))}
          </div>
        )}
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
