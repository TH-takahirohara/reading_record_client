import { IUser } from '@/features/common/types/user';
import { requestApi } from '@/utils/api';

interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface IRegisterError {
  msg: string;
  name: string;
  email: string;
  password: string;
}

interface IRegisterResponse {
  user: IUser;
  error: IRegisterError;
}

export const postUser = async (name: string, email: string, password: string) => {
  try {
    const { user, error } = await requestApi<IRegisterRequest, IRegisterResponse>(
      '/v1/users',
      'POST',
      {
        name: name,
        email: email,
        password: password,
      },
    );

    return { user, error };
  } catch (error) {
    if (error instanceof Error) {
      return { user: null, error: { msg: error.message } as IRegisterError };
    }
    return { user: null, error: { msg: 'エラーが発生しました' } as IRegisterError };
  }
};
