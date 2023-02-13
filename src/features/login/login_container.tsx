import styles from '@/features/login/login_container.module.scss';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { RootWrapperComponent } from '../common/components/root_wrapper_component';
import { InputComponent } from '../common/components/input_component';
import { postLoginInfo } from './apis/login_api';
import { ButtonComponent } from '../common/components/button_component';

export const LoginContainer = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const login = async () => {
    const { token, error } = await postLoginInfo(email, password);
    if (error) {
      const errors = [];
      if (error.msg) errors.push(error.msg);
      if (error.email) errors.push(`メールアドレス： ${error.email}`);
      if (error.password) errors.push(`パスワード： ${error.password}`);
      setErrors(errors);
      return;
    }

    localStorage.setItem('authToken', token.token);
    router.push('/readings');
  };

  return (
    <>
      <Head>
        <title>読書記録アプリ - ログイン</title>
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
          <ButtonComponent title='ログイン' onClick={login} />
        </div>
      </RootWrapperComponent>
    </>
  );
};
