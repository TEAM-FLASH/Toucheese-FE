import { defaultUserState } from '@store/useUserStore';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { IResvRes, IUser } from 'types/types';

export type ResStatus = 'DEFAULT' | 'RESERVED' | 'COMPLETED' | 'CANCELED';

// 예약 상태 별 예약 내역을 불러오는 hook
const fetchReservationList = async (status: ResStatus): Promise<IResvRes> => {
  const { accessToken } = getLocalStorageItem<IUser>('userState', defaultUserState);
  const newStatus = status.toLowerCase();

  const response = await fetch(
    `${import.meta.env.VITE_TOUCHEESE_API}/user/mypage/reservation${newStatus !== 'default' ? `/${newStatus}` : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const useGetReservationList = (resStatus: ResStatus): UseQueryResult<IResvRes> => {
  return useQuery({
    queryKey: ['reservation', { resStatus }],
    queryFn: () => fetchReservationList(resStatus),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    retry: 3,
    throwOnError: true,
  });
};
