import { IReading } from '@/features/common/types/common';
import { requestApiWithAuth } from '@/utils/api';

interface IMetadata {
  currentPage: number;
  pageSize: number;
  firstPage: number;
  lastPage: number;
  totalRecords: number;
}

interface IGetReadingsError {
  msg: string;
  page: string;
  pageSize: string;
}

interface IGetReadingsResponse {
  metadata: IMetadata;
  readings: IReading[];
  error: IGetReadingsError;
}

export const getReadings = async (page: number) => {
  try {
    const { metadata, readings, error } = await requestApiWithAuth<null, IGetReadingsResponse>(
      `/v1/readings?page=${page}&page_size=1`,
      'GET',
    );
    return { metadata, readings, error };
  } catch (err) {
    return {
      metadata: {} as IMetadata,
      readings: [],
      error: { msg: 'エラーが発生しました' } as IGetReadingsError,
    };
  }
};
