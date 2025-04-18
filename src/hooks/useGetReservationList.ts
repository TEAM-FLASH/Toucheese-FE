import { defaultUserState } from '@store/useUserStore';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { IResvRes, IUser } from 'types/types';

export type ResStatus = 'DEFAULT' | 'RESERVED' | 'COMPLETED' | 'CANCELED';

// 예약 상태 별 예약 내역을 불러오는 hook
const fetchReservationList = async (
  status: ResStatus,
  accessToken: string,
): Promise<IResvRes | undefined> => {
  try {
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
      if (response.status === 403) {
        throw new Error('403');
      }

      throw new Error('Failed: Unknown error');
    }

    const data = await response.json().catch(() => {
      return null;
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const useGetReservationList = (resStatus: ResStatus): UseQueryResult<IResvRes> => {
  const { accessToken } = getLocalStorageItem<IUser>('userState', defaultUserState);

  if (!accessToken) {
    throw new Error('AccessToken이 존재하지 않습니다!');
  }

  return useQuery({
    queryKey: ['reservationList', { resStatus, accessToken }],
    queryFn: () => fetchReservationList(resStatus, accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
