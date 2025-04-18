import { defaultUserState } from '@store/useUserStore';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { IStudioItem, IStudioRes, IUser } from 'types/types';

const fetchStudios = async (
  pageNum: number,
  mode: 'filter' | 'search/result',
  params: string,
  accessToken: string | null,
): Promise<IStudioRes<IStudioItem>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(
    `${import.meta.env.VITE_TOUCHEESE_API}/studio${mode ? `/${mode}` : ''}?size=${import.meta.env.VITE_TOUCHEESE_STUDIO_LIMIT}${pageNum > 0 ? `&page=${pageNum}` : ''}${params && `&${params}`}`,
    {
      method: 'GET',
      headers,
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();

  return data;
};

export const useGetStudios = (
  pageNum: number,
  mode: 'filter' | 'search/result',
  params: string,
): UseQueryResult<IStudioRes<IStudioItem>> => {
  const { accessToken } = getLocalStorageItem<IUser>('userState', defaultUserState);

  return useQuery<IStudioRes<IStudioItem>>({
    queryKey: ['studios', { params, mode, pageNum, accessToken }],
    queryFn: () => {
      if (accessToken) {
        return fetchStudios(pageNum, mode, params, accessToken);
      } else {
        return fetchStudios(pageNum, mode, params, accessToken);
      }
    },
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    throwOnError: true,
  });
};
