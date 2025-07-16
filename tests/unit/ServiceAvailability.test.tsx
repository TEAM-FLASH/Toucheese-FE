import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import useResetState from '@hooks/useResetState';
import { vi } from 'vitest';
import ServiceAvailability from '@components/ServiceAvailability/ServiceAvailability';

vi.mock('@store/useBottomSheetStateStore', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('@hooks/useResetState', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('ServiceAvailability', () => {
  const closeBottomSheetMock = vi.fn();
  const resetStateMock = vi.fn();

  beforeEach(() => {
    (useBottomSheetState as unknown as jest.Mock).mockReturnValue({ closeBottomSheet: closeBottomSheetMock });
    (useResetState as unknown as jest.Mock).mockReturnValue({ resetState: resetStateMock });
  });

  test('renders ServiceAvailability component', () => {
    render(
      <MemoryRouter>
        <ServiceAvailability />
      </MemoryRouter>,
    );

    expect(screen.getByText('1:1 보정')).toBeInTheDocument();
    expect(screen.getByText('적용하기')).toBeInTheDocument();
    expect(screen.getByText('초기화')).toBeInTheDocument();
  });

  test('handles button click and updates selected buttons', () => {
    render(
      <MemoryRouter>
        <ServiceAvailability />
      </MemoryRouter>,
    );

    const button = screen.getByText('1:1 보정');
    fireEvent.click(button);
  });

  test('calls closeBottomSheet on apply click', () => {
    render(
      <MemoryRouter>
        <ServiceAvailability />
      </MemoryRouter>,
    );

    const applyButton = screen.getByText('적용하기');
    fireEvent.click(applyButton);

    expect(closeBottomSheetMock).toHaveBeenCalled(); // 바텀 시트 닫기 함수 호출 확인
  });

  test('calls resetState on reset click', () => {
    render(
      <MemoryRouter>
        <ServiceAvailability />
      </MemoryRouter>,
    );

    const resetButton = screen.getByText('초기화');
    fireEvent.click(resetButton);

    expect(resetStateMock).toHaveBeenCalled(); // 상태 초기화 함수 호출 확인
  });
});
