export const fetcher = async <T = any>(url: string, option?: RequestInit): Promise<T> => {
  const response = await fetch(url, option);
  return response.json();
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const requestApi = <T, U>(path: string, method: RequestMethod, body?: T) => {
  return fetcher<U>(`${process.env.NEXT_PUBLIC_API_ORIGIN}${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

export const requestApiWithAuth = <T, U>(path: string, method: RequestMethod, body?: T) => {
  return fetcher<U>(`${process.env.NEXT_PUBLIC_API_ORIGIN}${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
};
