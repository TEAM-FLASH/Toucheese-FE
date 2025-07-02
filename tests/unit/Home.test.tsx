import Home from '@pages/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test, vi } from 'vitest';

const openBottomSheetMock = vi.fn();

// useBottomSheetState의 default export: useBottonSheetState를 vi.fn()으로 Mock => 내부에 openBottomSheet Action Mock
vi.mock('@store/useBottomSheetStateStore', () => ({
  default: vi.fn(() => ({
    openBottomSheet: openBottomSheetMock,
  })),
}));

describe('Home Component', () => {
  const queryClient = new QueryClient();

  const renderWithQueryClient = (children: React.ReactNode, { route = '/' } = {}) =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </QueryClientProvider>,
    );

  // 테스트 전 모든 Mock 초기화
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Home 컴포넌트와 하위 컴포넌트들을 렌더링해야 합니다.', () => {
    renderWithQueryClient(<Home />, { route: '/' });
    expect(screen.findByAltText(/필터 초기화/i));
    expect(screen.getByText('인기순')).toBeInTheDocument();
    expect(screen.getByText('가격대')).toBeInTheDocument();
    expect(screen.getByText('매장정보')).toBeInTheDocument();
  });

  test('Home 컴포넌트의 스크롤이 -78px이 되면 Navigator의 position을 fixed로 설정해야 합니다.', () => {
    renderWithQueryClient(<Home />, { route: '/' });
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);

    waitFor(() => {
      const navigator = screen.getByText('몽환').closest('div');
      expect(navigator).toHaveStyle('position: fixed');
    });
  });

  test('필터 버튼을 누르면 바텀시트를 오픈해야 합니다.', () => {
    renderWithQueryClient(<Home />, { route: '/' });

    // 인기순 버튼 클릭
    fireEvent.click(screen.getByText('인기순'));
    expect(openBottomSheetMock).toHaveBeenCalledWith(expect.anything(), '정렬');

    // 가격대 버튼 클릭
    fireEvent.click(screen.getByText('가격대'));
    expect(openBottomSheetMock).toHaveBeenCalledWith(expect.anything(), '가격');

    // 매장정보 버튼 클릭
    fireEvent.click(screen.getByText('매장정보'));
    expect(openBottomSheetMock).toHaveBeenCalledWith(expect.anything(), '매장정보');
  });
});
