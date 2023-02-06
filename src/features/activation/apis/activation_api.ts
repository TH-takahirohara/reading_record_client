import { IUser } from '@/features/common/types/user';
import { requestApi } from '@/utils/api';

interface IActivationRequest {
  token: string;
}

interface IActivationError {
  msg: string | null;
  token: string | null;
}

interface IActivationResponse {
  user: IUser;
  error: IActivationError;
}

export const putToken = async (token: string) => {
  try {
    const { user, error } = await requestApi<IActivationRequest, IActivationResponse>(
      '/v1/users/activated',
      'PUT',
      {
        token: token,
      },
    );

    return { user, error };
  } catch (error) {
    if (error instanceof Error) {
      return { user: null, error: { msg: error.message } as IActivationError };
    }
    return { user: null, error: { msg: 'エラーが発生しました' } as IActivationError };
  }
};
