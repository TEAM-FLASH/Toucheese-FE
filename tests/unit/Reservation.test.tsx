import * as AvailableDateHook from '@hooks/useGetAvailableDate';
import ReservationSchedule from '@pages/Reservation/ReservationSchedule';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, vi } from 'vitest';
import { mockAvailableDateData } from '../__mocks__/mockAvailableDateData';
import { reservationStorage } from '../__mocks__/mockReservationStorage';

describe('예약 통합 테스트', () => {
  const queryClient = new QueryClient();
  const renderWithQueryClient = (entry: string, path: string, element: ReactNode) => {
    render(
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[entry]}>
            <Routes>
              <Route path={path} element={element} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </HelmetProvider>,
    );
  };

  test('날짜와 시간을 선택하면 "결제 페이지로" 버튼이 활성화된다.', async () => {
    sessionStorage.clear();
    sessionStorage.setItem('reservation-storage', JSON.stringify(reservationStorage));

    vi.mock('@hooks/useGetAvailableDate');
    vi.spyOn(AvailableDateHook, 'useGetAvailableDate').mockReturnValue({
      data: mockAvailableDateData,
      isLoading: false,
      isError: false,
    } as any);

    renderWithQueryClient(
      '/studio/1/reservation',
      '/studio/:_id/reservation',
      <ReservationSchedule />,
    );

    // 1. 예약 정보 확인 - 사진관 이름 노출

    // 2. 날짜 선택
    const dateBox = screen.getByTestId('dateBox');
    const dates = within(dateBox).getAllByRole('button') as HTMLButtonElement[];
    const enabledDates = dates.filter((date) => !date.disabled);
    await userEvent.click(enabledDates[0]);

    // 3. 시간 선택
    const timeBox = await screen.findByTestId('timeBox');
    const times = within(timeBox).getAllByRole('button') as HTMLButtonElement[];
    const enabledTimes = times.filter((date) => !date.disabled);
    await userEvent.click(enabledTimes[0]);

    // 4. '결제 페이지로' 버튼 활성화
    const toNextPageBtn = screen.findByTestId('toPaymentBtn');
    const isAvailable = await toNextPageBtn;
    expect(isAvailable).toBeEnabled();
  });

  test('결제 내용 동의에 체크하면 "결제하기" 버튼이 활성화 된다.', async () => {
    // 1. 결제 내용 동의 체크
    // 2. 버튼(결제하기) 활성화
  });

  test('예약된 정보를 확인할 수 있다.', async () => {
    // 1. 예약 페이지 진입 확인 ('예약이 신청되었습니다.')
    // 2. 예약 정보 확인 (매장명, 날짜, 시간 체크)
  });
});
