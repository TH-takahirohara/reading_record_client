import { Constants } from '@/constants/constants';

export const fetcher = async <T = any>(url: string, option?: RequestInit): Promise<T> => {
  const response = await fetch(url, option);
  return response.json();
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const requestApi = <T, U>(path: string, method: RequestMethod, body?: T) => {
  return fetcher<U>(`${Constants.shared().apiOrigin}${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
