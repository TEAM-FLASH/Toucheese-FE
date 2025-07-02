import Bookmark from '@components/Bookmark/Bookmark';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, vi } from 'vitest';

// API 호출이 항상 성공적임을 가정
vi.mock('@hooks/useBookmark', () => ({
  default: () => vi.fn(() => Promise.resolve()),
}));

describe('Bookmark Test', () => {
  // 북마크 컴포넌트 렌더링 테스트
  test('북마크 컴포넌트를 렌더링한다.', () => {
    const id = 146;
    const count = 297;
    const isBookmarked = false;

    render(<Bookmark id={id} count={count} isBookmarked={isBookmarked} type="default" />);

    const img = screen.getByRole('img', {
      name: new RegExp(`북마크 ${isBookmarked ? '해제' : '등록'}`, 'i'),
    });
    const cnt = screen.getByText(count);

    // isBookmarked 상태에 따라 이미지가 일치하는지 확인
    expect(img).toHaveAttribute(
      'src',
      `/img/icon-bookmark-${isBookmarked ? 'active' : 'inactive'}.svg`,
    );
    // 북마크 수가 잘 렌더링 되는지 확인
    expect(cnt).toBeInTheDocument();
  });

  // 북마크 설정 테스트
  test('북마크가 해제된 상태일 때 클릭하면 활성화 이미지로 변경하고 북마크 수를 1 증가시킨다.', async () => {
    const id = 146;
    const count = 297;
    const isBookmarked = false;
    const user = userEvent.setup();

    render(<Bookmark id={id} count={count} isBookmarked={isBookmarked} type="default" />);

    // 북마크 버튼이 잘 렌더링 되는지 확인
    const button = screen.getByRole('button', { name: new RegExp(`북마크 등록`, 'i') });
    expect(button).toBeInTheDocument();

    // 초기 상태 확인
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', `/img/icon-bookmark-inactive.svg`);
    expect(screen.getByText(count)).toBeInTheDocument();

    // 사용자가 버튼 클릭
    await user.click(button);

    // 이미지가 "북마크 활성" 이미지로 변경되고, 숫자가 1 증가한다.
    await waitFor(() => {
      const updatedImg = screen.getByRole('img');
      expect(updatedImg).toHaveAttribute('src', `/img/icon-bookmark-active.svg`);
      expect(screen.getByText(count + 1)).toBeInTheDocument();
    });
  });

  // 북마크 해제 테스트
  test('북마크가 활성화된 상태일 때 클릭하면 비활성화 이미지로 변경하고 북마크 수를 1 감소시킨다.', async () => {
    const id = 146;
    const count = 297;
    const isBookmarked = true;
    const user = userEvent.setup();

    render(<Bookmark id={id} count={count} isBookmarked={isBookmarked} type="default" />);

    // 북마크 버튼이 잘 렌더링 되는지 확인
    const button = screen.getByRole('button', { name: new RegExp(`북마크 해제`, 'i') });
    expect(button).toBeInTheDocument();

    // 초기 상태 확인
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', `/img/icon-bookmark-active.svg`);
    expect(screen.getByText(count)).toBeInTheDocument();

    // 사용자가 버튼 클릭
    await user.click(button);

    // 이미지가 "북마크 활성" 이미지로 변경되고, 숫자가 1 증가한다.
    await waitFor(() => {
      const updatedImg = screen.getByRole('img');
      expect(updatedImg).toHaveAttribute('src', `/img/icon-bookmark-inactive.svg`);
      expect(screen.getByText(count - 1)).toBeInTheDocument();
    });
  });
});
