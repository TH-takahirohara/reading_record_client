import { IReading } from '@/features/common/types/common';
import { requestApiWithAuth } from '@/utils/api';

interface ICreateReadingRequest {
  bookName: string;
  bookAuthor: string;
  totalPageCount: number;
}

interface IReadingFormError {
  msg: string;
  bookName: string;
  bookAuthor: string;
  totalPageCount: number;
}

interface ICreateReadingResponse {
  reading: IReading;
  error: IReadingFormError;
}

export const createReading = async (
  bookName: string,
  bookAuthor: string,
  totalPageCount: number,
) => {
  try {
    const { reading, error } = await requestApiWithAuth<
      ICreateReadingRequest,
      ICreateReadingResponse
    >(`/v1/readings`, 'POST', {
      bookName: bookName,
      bookAuthor: bookAuthor,
      totalPageCount: totalPageCount,
    });

    return { reading, error };
  } catch (err) {
    return {
      reading: {} as ICreateReadingResponse,
      error: { msg: 'エラーが発生しました' } as IReadingFormError,
    };
  }
};
