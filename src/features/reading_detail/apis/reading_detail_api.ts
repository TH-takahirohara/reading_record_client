import { IReading } from '@/features/common/types/common';
import { requestApiWithAuth } from '@/utils/api';

interface IGetReadingError {
  msg: string;
}

interface IGetReadingResponse {
  reading: IReading;
  error: IGetReadingError;
}

export const getReading = async (readingId: number) => {
  try {
    const { reading, error } = await requestApiWithAuth<null, IGetReadingResponse>(
      `/v1/readings/${readingId}`,
      'GET',
    );

    return { reading, error };
  } catch (err) {
    return {
      reading: {} as IReading,
      error: { msg: 'エラーが発生しました' } as IGetReadingError,
    };
  }
};
