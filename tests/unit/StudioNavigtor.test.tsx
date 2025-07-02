import StudioNavigator from '@components/Navigator/StudioNavigator';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { describe, test } from 'vitest';

// 현재 경로 파악을 위한 컴포넌트
const LocationCheck = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

describe('StudioNavigator Test', () => {
  const studioId = '146';
  const initialRoute = `/studio/${studioId}`;

  const renderWithRouter = (nest: string = '') => {
    render(
      <MemoryRouter initialEntries={[`${initialRoute}/${nest}`]}>
        <LocationCheck />
        <StudioNavigator _id={studioId} />
      </MemoryRouter>,
    );
  };

  // 상단 탭 렌더링
  test('스튜디오 상세에서 상단 탭을 렌더링한다.', () => {
    renderWithRouter();
    expect(screen.getByRole('link', { name: /홈/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /메뉴/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /리뷰/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /포트폴리오/i })).toBeInTheDocument();
  });

  // 홈을 누르면 스튜디오 상세 홈으로 이동
  test('상단 탭에서 홈을 누르면 홈 화면으로 이동한다.', async () => {
    renderWithRouter('menu');
    const user = userEvent.setup();
    const homeLink = screen.getByRole('link', { name: /홈/i });
    const menuLink = screen.getByRole('link', { name: /메뉴/i });
    const portfolioLink = screen.getByRole('link', { name: /포트폴리오/i });
    const reviewLink = screen.getByRole('link', { name: /리뷰/i });

    // 사용자가 홈 링크 클릭
    await user.click(homeLink);

    // 페이지 이동 확인
    expect(screen.getByTestId('location')).toHaveTextContent(`/studio/${studioId}`);

    // 클릭 후, 홈 경로가 활성화되었는지 확인
    expect(homeLink).toHaveClass('active');
    expect(menuLink).not.toHaveClass('active');
    expect(portfolioLink).not.toHaveClass('active');
    expect(reviewLink).not.toHaveClass('active');
  });

  // 메뉴를 누르면 스튜디오 상세 메뉴로 이동
  test('상단 탭에서 메뉴를 누르면 메뉴 화면으로 이동한다.', async () => {
    renderWithRouter();
    const user = userEvent.setup();
    const homeLink = screen.getByRole('link', { name: /홈/i });
    const menuLink = screen.getByRole('link', { name: /메뉴/i });
    const portfolioLink = screen.getByRole('link', { name: /포트폴리오/i });
    const reviewLink = screen.getByRole('link', { name: /리뷰/i });

    // 사용자가 홈 링크 클릭
    await user.click(menuLink);

    // 페이지 이동 확인
    expect(screen.getByTestId('location')).toHaveTextContent(`/studio/${studioId}/menu`);

    // 클릭 후, 홈 경로가 활성화되었는지 확인
    expect(menuLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
    expect(portfolioLink).not.toHaveClass('active');
    expect(reviewLink).not.toHaveClass('active');
  });

  // 포트폴리오를 누르면 스튜디오 상세 포트폴리오로 이동
  test('상단 탭에서 포트폴리오를 누르면 포트폴리오 화면으로 이동한다.', async () => {
    renderWithRouter();
    const user = userEvent.setup();
    const homeLink = screen.getByRole('link', { name: /홈/i });
    const menuLink = screen.getByRole('link', { name: /메뉴/i });
    const portfolioLink = screen.getByRole('link', { name: /포트폴리오/i });
    const reviewLink = screen.getByRole('link', { name: /리뷰/i });

    // 사용자가 홈 링크 클릭
    await user.click(portfolioLink);

    // 페이지 이동 확인
    expect(screen.getByTestId('location')).toHaveTextContent(`/studio/${studioId}/portfolio`);

    // 클릭 후, 홈 경로가 활성화되었는지 확인
    expect(portfolioLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
    expect(menuLink).not.toHaveClass('active');
    expect(reviewLink).not.toHaveClass('active');
  });

  // 리뷰를 누르면 스튜디오 상세 리뷰로 이동
  test('상단 탭에서 리뷰를 누르면 리뷰 화면으로 이동한다.', async () => {
    renderWithRouter();
    const user = userEvent.setup();
    const homeLink = screen.getByRole('link', { name: /홈/i });
    const menuLink = screen.getByRole('link', { name: /메뉴/i });
    const portfolioLink = screen.getByRole('link', { name: /포트폴리오/i });
    const reviewLink = screen.getByRole('link', { name: /리뷰/i });

    // 사용자가 홈 링크 클릭
    await user.click(reviewLink);

    // 페이지 이동 확인
    expect(screen.getByTestId('location')).toHaveTextContent(`/studio/${studioId}/review`);

    // 클릭 후, 홈 경로가 활성화되었는지 확인
    expect(reviewLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
    expect(menuLink).not.toHaveClass('active');
    expect(portfolioLink).not.toHaveClass('active');
  });
});
