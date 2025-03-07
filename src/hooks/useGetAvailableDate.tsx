import { convertToDateFormat } from '@store/useSelectDateStore';
import { useQuery } from '@tanstack/react-query';

const fetchAvailableDate = async (_id: string, baseDate: Date) => {
  const base = `${import.meta.env.VITE_TOUCHEESE_API}/reservation/time?studioId=${_id}&date=${convertToDateFormat(baseDate)}&duration=${60}`;

  const response = await fetch(base, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export const useGetAvailableDate = (_id: string, baseDate: Date) => {
  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();

  return useQuery({
    queryKey: ['reservationTimes', _id, `${baseYear}-${baseMonth}`],
    queryFn: () => fetchAvailableDate(_id, baseDate),
    staleTime: 1000 * 60 * 10, // 10분
    throwOnError: true,
  });
};

export const filterTimes = [
  {
    time: '09:00',
    available: true,
  },
  {
    time: '10:00',
    available: true,
  },
  {
    time: '11:00',
    available: true,
  },
  {
    time: '12:00',
    available: true,
  },
  {
    time: '13:00',
    available: true,
  },
  {
    time: '14:00',
    available: true,
  },
  {
    time: '15:00',
    available: true,
  },
  {
    time: '16:00',
    available: true,
  },
  {
    time: '17:00',
    available: true,
  },
  {
    time: '18:00',
    available: true,
  },
  {
    time: '19:00',
    available: true,
  },
  {
    time: '20:00',
    available: true,
  },
];
