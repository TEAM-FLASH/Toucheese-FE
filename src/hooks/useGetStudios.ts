import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IStudioItem, IStudioRes } from 'types/types';

const fetchStudios = async (
  pageNum: number,
  mode: 'filter' | 'search/result',
  params: string,
): Promise<IStudioRes<IStudioItem>> => {
  const response = await fetch(
    `${import.meta.env.VITE_TOUCHEESE_API}/studio${mode ? `/${mode}` : ''}?size=${import.meta.env.VITE_TOUCHEESE_STUDIO_LIMIT}${pageNum > 0 ? `&page=${pageNum}` : ''}${params && `&${params}`}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const useGetStudios = (
  pageNum: number,
  mode: 'filter' | 'search/result',
  params: string,
): UseQueryResult<IStudioRes<IStudioItem>> => {
  return useQuery<IStudioRes<IStudioItem>>({
    queryKey: ['studios', { params, mode, pageNum }],
    queryFn: () => fetchStudios(pageNum, mode, params),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    throwOnError: true,
  });
};
