import { describe, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import variables from '@styles/Variables';
import { MemoryRouter } from 'react-router-dom';
import ThemeNavigator from '@components/Navigator/ThemeNavigator';

describe('ThemeNavigator', () => {
  test('renders all themes', () => {
    render(
      <MemoryRouter>
        <ThemeNavigator />
      </MemoryRouter>,
    );
    const themes = ['전체', '몽환', '내추럴', '러블리', '시크', '청순', '상큼'];

    themes.forEach((theme) => {
      expect(screen.getByText(theme)).toBeInTheDocument();
    });
  });

  test('버튼 클릭 시 활성화', () => {
    render(
      <MemoryRouter>
        <ThemeNavigator />
      </MemoryRouter>,
    );
    const naturalButton = screen.getByText('내추럴');

    // 클릭 전 '내추럴' 버튼이 비활성화 상태인지 확인
    expect(naturalButton).toHaveStyle(`color : ${variables.colors.gray500}`);

    // '내추럴' 버튼 클릭
    fireEvent.click(naturalButton);

    // 클릭 후 '내추럴' 버튼이 활성화 상태인지 확인
    expect(naturalButton).toHaveStyle(`color : ${variables.colors.white}`);
  });
});
