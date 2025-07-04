import * as AvailableDateHook from '@hooks/useGetAvailableDate';
import * as reservationDataHook from '@hooks/useGetReservationData';
import ReservationCheck from '@pages/Reservation/ReservationCheck';
import ReservationComplete from '@pages/Reservation/ReservationComplete';
import ReservationSchedule from '@pages/Reservation/ReservationSchedule';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterAll, describe, vi } from 'vitest';
import { mockAvailableDateData } from '../__mocks__/mockAvailableDateData';
import { mockReservationData } from '../__mocks__/mockReservationData';
import { reservationStorage } from '../__mocks__/mockReservationStorage';
import { cleanupModalPortal, setupModalPortal } from '../utils/setupModalPortal';

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

  beforeAll(() => {
    sessionStorage.setItem('reservation-storage', JSON.stringify(reservationStorage));
    localStorage.setItem(
      'userState',
      JSON.stringify({ state: { accessToken: 'mockAccessToken' } }),
    );
    setupModalPortal();
  });

  afterAll(() => {
    sessionStorage.clear();
    localStorage.clear();
    cleanupModalPortal();
  });

  test('날짜와 시간을 선택하면 "결제 페이지로" 버튼이 활성화된다.', async () => {
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
    // await waitFor(() => {
    //   expect(screen.getByTestId('studioName')).toHaveTextContent('아워유스');
    // });

    // const studioNameEl = await screen.findByTestId('studioName');
    // studioName = studioNameEl.textContent;
    // console.log(studioNameEl.textContent, studioName);

    // console.log('🐛', studioNameEl);
    // console.log(sessionStorage.getItem('reservation-storage'));

    // await waitFor(() => {
    //   expect(screen.getByTestId('studioName')).toHaveTextContent('아워유스');
    // });

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
    expect(await screen.findByTestId('toPaymentBtn')).toBeEnabled();
  });

  test('결제 동의에 체크하면 "결제하기" 버튼이 활성화 된다.', async () => {
    renderWithQueryClient(
      '/studio/1/reservation',
      '/studio/:_id/reservation',
      <ReservationCheck />,
    );

    // 1. 결제 내용 동의 체크
    const checkbox = (await screen.findByTestId('paymentAgree')) as HTMLInputElement;
    await userEvent.click(checkbox);

    // 2. 버튼(결제하기) 활성화
    expect(screen.getByTestId('paymentBtn')).toBeEnabled();
  });

  test('예약된 정보를 확인할 수 있다.', async () => {
    vi.mock('@hooks/useGetReservationData');
    vi.spyOn(reservationDataHook, 'useGetReservationData').mockReturnValue({
      data: mockReservationData,
      isLoading: false,
      isError: false,
    } as any);

    renderWithQueryClient(
      '/studio/1/reservation/complete?reservationId=48',
      '/studio/:_id/reservation/complete',
      <ReservationComplete />,
    );

    // 1. 예약 페이지 진입 확인 ('예약이 신청되었습니다.')
    expect(screen.getByText(/예약이 신청되었습니다./)).toBeVisible;

    // 2. 예약 정보 확인 (매장명, 날짜, 시간 체크)
    expect(screen.getByText(/아워유스/)).toBeVisible;
    expect(screen.getByText(/증명사진/)).toBeVisible;
  });
});
