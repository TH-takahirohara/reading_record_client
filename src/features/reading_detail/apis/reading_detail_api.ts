import { IDailyProgress, IReading } from '@/features/common/types/common';
import { requestApiWithAuth } from '@/utils/api';

interface IGetReadingError {
  msg: string;
}

interface IGetReadingResponse {
  reading: IReading;
  error: IGetReadingError;
}

interface IPostDailyProgressRequest {
  readDate: string;
  readPage: number;
}

interface IPostDailyProgressError {
  msg: string;
  readDate: string;
  readPage: string;
}

interface IPostDailyProgressResponse {
  dailyProgress: IDailyProgress;
  error: IPostDailyProgressError;
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

export const postDailyProgress = async (readingId: number, readDate: string, readPage: number) => {
  try {
    const { dailyProgress, error } = await requestApiWithAuth<
      IPostDailyProgressRequest,
      IPostDailyProgressResponse
    >(`/v1/readings/${readingId}/daily_progresses`, 'POST', {
      readDate: new Date(readDate).toJSON(),
      readPage: readPage,
    });

    return { dailyProgress, error };
  } catch (err) {
    return {
      dailyProgress: {} as IDailyProgress,
      error: { msg: 'エラーが発生しました' } as IPostDailyProgressError,
    };
  }
};
