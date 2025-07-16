import Home from '@pages/Home/Home';
import { convertToDateFormat } from '@store/useSelectDateStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';

describe('지역 및 날짜 선택 모달', () => {
  const queryClient = new QueryClient();
  const renderWithQueryClient = (children: React.ReactNode, { route = '/' } = {}) =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </QueryClientProvider>,
    );

  beforeEach(async () => {
    renderWithQueryClient(<Home />, { route: '/' });
  });

  test('지역 및 날짜 선택 모달을 활성화한다', async () => {
    // 지역 및 날짜 선택 모달 오픈
    const openModalButton = screen.getByText(/전체지역/);
    await userEvent.click(openModalButton);

    // 지역 및 날짜 선택 모달 오픈 확인
    const modalTitle = screen.getAllByRole('heading', { name: '지역, 날짜 선택' })[0];
    expect(modalTitle).toBeInTheDocument();
  });

  test('"지역 선택" 버튼을 누르면 해당 바텀 시트가 활성화 된다', async () => {
    // 지역 선택 버튼 탐색
    const localBottomSheetOpenButton = screen.getByRole('button', { name: '지역 선택' });
    await userEvent.click(localBottomSheetOpenButton);

    // 지역 선택 바텀시트 검증
    const bottomSheetTitle = screen.getByRole('heading', { name: '지역 선택' });
    expect(bottomSheetTitle).toBeInTheDocument();

    // 바텀시트 종료
    const closeButton = screen.getByRole('button', { name: '바텀시트 닫기' });
    userEvent.click(closeButton);

    // 바텀시트 종료 검증
    await waitFor(() => expect(closeButton).not.toBeInTheDocument());
  });

  test('"예약 날짜 선택" 버튼을 누르면 해당 바텀 시트가 활성화 된다', async () => {
    const today = new Date();

    // 날짜 선택 버튼 탐색
    const dateBottomSheetOpenButton = screen.getByRole('button', { name: '예약 날짜 선택' });
    await userEvent.click(dateBottomSheetOpenButton);

    // 날짜 선택 바텀시트 검증
    const bottomSheetTitle = screen.getByText(convertToDateFormat(today));
    expect(bottomSheetTitle).toBeInTheDocument();

    // 바텀시트 종료
    const closeButton = screen.getByRole('button', { name: '바텀시트 닫기' });
    userEvent.click(closeButton);

    // 바텀시트 종료 검증
    await waitFor(() => expect(closeButton).not.toBeInTheDocument());
  });

  test('적용하기 버튼을 누르면 모달이 꺼지고 파라미터가 변경된다', async () => {
    const modalTitle = screen.getByRole('heading', { name: '지역, 날짜 선택' });

    // 모달 종료 버튼 클릭
    const applyButton = screen.getByRole('button', { name: '적용하기' });
    await userEvent.click(applyButton);

    // 모달 종료 검증
    expect(modalTitle).not.toBeInTheDocument();

    // 파라미터 변경 검증 추가 예정
    // requestedDateTime
    // requestedLocation
  });
});
