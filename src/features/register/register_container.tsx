import styles from '@/features/register/register_container.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { postUser } from './apis/register_api';
import { RootWrapperComponent } from '../common/components/root_wrapper_component';
import { InputComponent } from '../common/components/input_component';

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
      <RootWrapperComponent>
        {errors.length !== 0 && (
          <div className={styles.errors}>
            {errors.map((errorText, idx) => (
              <div key={idx}>{errorText}</div>
            ))}
          </div>
        )}
        <div className={styles.form}>
          <InputComponent
            id='name'
            type='text'
            labelText='ユーザー名'
            value={name}
            setFunc={setName}
          />
          <InputComponent
            id='email'
            type='email'
            labelText='メールアドレス'
            value={email}
            setFunc={setEmail}
          />
          <InputComponent
            id='password'
            type='password'
            labelText='パスワード'
            value={password}
            setFunc={setPassword}
          />
          <button className={styles.button} onClick={register}>
            登録
          </button>
        </div>
      </RootWrapperComponent>
    </>
  );
};
