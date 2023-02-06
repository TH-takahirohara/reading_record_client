import styles from '@/features/after_registration/after_registration_container.module.scss';
import Head from 'next/head';
import { RootWrapperComponent } from '../common/components/root_wrapper_component';

export const AfterRegistrationContainer = () => {
  return (
    <>
      <Head>
        <title>読書記録アプリ - 仮登録完了</title>
        <link rel='icon' href='/images/logo.png' />
      </Head>
      <RootWrapperComponent>
        <div className={styles.contents}>
          <p>読書記録アプリの仮登録が完了しました。</p>
          <p>ご登録いただいたメールアドレス宛にメールを送付いたしましたので、</p>
          <p>メールの内容に従い登録ユーザーの有効化操作を行ってください。</p>
        </div>
      </RootWrapperComponent>
    </>
  );
};
