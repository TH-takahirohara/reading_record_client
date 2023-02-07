import { requestApi } from '@/utils/api';

interface ILoginRequest {
  email: string;
  password: string;
}

interface IToken {
  expire: string;
  token: string;
}

interface ILoginError {
  msg: string | null;
  email: string | null;
  password: string | null;
}

interface ILoginResponse {
  authenticationToken: IToken;
  error: ILoginError;
}

export const postLoginInfo = async (email: string, password: string) => {
  try {
    const { authenticationToken: token, error } = await requestApi<ILoginRequest, ILoginResponse>(
      '/v1/tokens/authentication',
      'POST',
      {
        email: email,
        password: password,
      },
    );

    return { token, error };
  } catch (error) {
    if (error instanceof Error) {
      return {
        token: {} as IToken,
        error: { msg: error.message } as ILoginError,
      };
    }
    return {
      token: {} as IToken,
      error: { msg: 'エラーが発生しました' } as ILoginError,
    };
  }
};
