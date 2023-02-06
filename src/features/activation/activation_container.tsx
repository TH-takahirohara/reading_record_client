import styles from '@/features/activation/activation_container.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { RootWrapperComponent } from '../common/components/root_wrapper_component';
import { putToken } from './apis/activation_api';

export const ActivationContainer = () => {
  const [token, setToken] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const sendToken = async () => {
    const { error } = await putToken(token);
    if (error) {
      const errors = [];
      if (error.msg) errors.push(error.msg);
      if (error.token) errors.push(`トークン文字列： ${error.token}`);
      setErrors(errors);
      return;
    }

    // TODO: アクティベーション成功後のページに遷移する
  };

  return (
    <>
      <Head>
        <title>読書記録アプリ - アクティベーション</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <RootWrapperComponent>
        {errors.length !== 0 && (
          <div className={styles.errors}>
            {errors.map((errorText, idx) => (
              <div key={idx}>{errorText}</div>
            ))}
          </div>
        )}
        <div className={styles.inputWrapper}>
          <label htmlFor='activation' className={styles.label}>
            トークン文字列
          </label>
          <input
            type='text'
            name='activation'
            id='activation'
            className={styles.input}
            value={token}
            onChange={e => setToken(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={sendToken}>
          送信
        </button>
      </RootWrapperComponent>
    </>
  );
};
