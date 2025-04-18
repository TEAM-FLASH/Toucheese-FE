import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IReservationData } from 'types/types';

const ENDPOINT = `${import.meta.env.VITE_TOUCHEESE_API}/reservation/check`;

const fetchReservationData = async (
  _id: string,
  accessToken: string,
): Promise<IReservationData | undefined> => {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        reservationId: _id,
      }),
    });

    if (!response.ok) throw new Error('Failed to fetch data');

    const data: IReservationData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
};

export const useGetReservationData = (
  _id: string,
  accessToken: string,
): UseQueryResult<IReservationData> => {
  return useQuery({
    queryKey: ['reservation', _id],
    queryFn: () => fetchReservationData(_id, accessToken),
    enabled: !!accessToken,
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
    throwOnError: true,
  });
};
