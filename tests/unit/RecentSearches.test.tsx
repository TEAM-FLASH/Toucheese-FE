import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RecentSearches from '@components/Search/RecentSearches';

describe('RecentSearches', () => {
  test('최근 검색 기록이 없을 때 빈 상태를 렌더링한다', () => {
    localStorage.setItem('recentSearches', JSON.stringify([]));
    render(
      <MemoryRouter>
        <RecentSearches />
      </MemoryRouter>,
    );

    expect(screen.getByText('최근 검색어가 없습니다.')).toBeInTheDocument();
  });

  test('localStorage에서 최근 검색 기록을 렌더링한다', () => {
    const mockSearches = ['검색1', '검색2'];
    localStorage.setItem('recentSearches', JSON.stringify(mockSearches));

    render(
      <MemoryRouter>
        <RecentSearches />
      </MemoryRouter>,
    );

    mockSearches.forEach((search) => {
      expect(screen.getByText(search)).toBeInTheDocument();
    });
  });

  test('"모두지우기"를 클릭하면 모든 검색 기록을 삭제한다', () => {
    const mockSearches = ['검색1', '검색2'];
    localStorage.setItem('recentSearches', JSON.stringify(mockSearches));

    render(
      <MemoryRouter>
        <RecentSearches />
      </MemoryRouter>,
    );
    const clearAllButton = screen.getByText('모두지우기');

    fireEvent.click(clearAllButton);

    expect(screen.queryByText('검색1')).not.toBeInTheDocument();
    expect(screen.queryByText('검색2')).not.toBeInTheDocument();
    expect(localStorage.getItem('recentSearches')).toBe(null);
  });
});
