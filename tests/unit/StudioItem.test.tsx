import StudioItem from '@components/Studio/StudioItem';
import { fireEvent, render, screen } from '@testing-library/react';
import { IStudioItem } from 'types/types';
import { describe, expect, test } from 'vitest';

const mockStudio: IStudioItem = {
  id: 146,
  vibe: '시크',
  addressSi: '서울시',
  addressGu: '성북구',
  name: '주 스튜디오',
  description: 'this is sample description_36',
  address: '동소문로 35 2층',
  phone: '010-0000-0035',
  view_count: 206,
  rating: 3.2,
  bookmark_count: 297,
  review_count: 278,
  latitude: null,
  longitude: null,
  open_time: '09:00:00',
  close_time: '18:00:00',
  subVibe: '선명한',
  portfolios: [
    {
      id: 182,
      studio: '주 스튜디오',
      vibe: '시크',
      name: '주스 스튜디오_Vibe_2_182',
      url: 'https://i.imgur.com/BMDwLgQ.jpeg',
      description: 'this is sample description',
      menuId: null,
      menuName: null,
      created_at: '2024-12-03T21:02:58',
      updated_at: null,
    },
    {
      id: 183,
      studio: '주 스튜디오',
      vibe: '시크',
      name: '주스 스튜디오_Vibe_2_183',
      url: 'https://i.imgur.com/7C4GSF4.jpeg',
      description: 'this is sample description',
      menuId: null,
      menuName: null,
      created_at: '2024-12-03T21:02:58',
      updated_at: null,
    },
    {
      id: 184,
      studio: '주 스튜디오',
      vibe: '시크',
      name: '주스 스튜디오_Vibe_2_184',
      url: 'https://i.imgur.com/yjmxVej.jpeg',
      description: 'this is sample description',
      menuId: null,
      menuName: null,
      created_at: '2024-12-03T21:02:58',
      updated_at: null,
    },
    {
      id: 185,
      studio: '주 스튜디오',
      vibe: '시크',
      name: '주스 스튜디오_Vibe_2_185',
      url: 'https://i.imgur.com/zwoRb86.jpeg',
      description: 'this is sample description',
      menuId: null,
      menuName: null,
      created_at: '2024-12-03T21:02:58',
      updated_at: null,
    },
    {
      id: 186,
      studio: '주 스튜디오',
      vibe: '시크',
      name: '주스 스튜디오_Vibe_2_186',
      url: 'https://i.imgur.com/HWtmnvf.jpeg',
      description: 'this is sample description',
      menuId: null,
      menuName: null,
      created_at: '2024-12-03T21:02:58',
      updated_at: null,
    },
    {
      id: 187,
      studio: '주 스튜디오',
      vibe: '시크',
      name: '주스 스튜디오_Vibe_2_187',
      url: 'https://i.imgur.com/6lMAQjA.jpeg',
      description: 'this is sample description',
      menuId: null,
      menuName: null,
      created_at: '2024-12-03T21:02:58',
      updated_at: null,
    },
    {
      id: 188,
      studio: '주 스튜디오',
      vibe: '시크',
      name: '주스 스튜디오_Vibe_2_188',
      url: 'https://i.imgur.com/FcjS6Rd.jpeg',
      description: 'this is sample description',
      menuId: null,
      menuName: null,
      created_at: '2024-12-03T21:02:58',
      updated_at: null,
    },
    {
      id: 189,
      studio: '주 스튜디오',
      vibe: '시크',
      name: '주스 스튜디오_Vibe_2_189',
      url: 'https://i.imgur.com/tPl867U.jpeg',
      description: 'this is sample description',
      menuId: null,
      menuName: null,
      created_at: '2024-12-03T21:02:58',
      updated_at: null,
    },
  ],
  menus: [
    {
      id: 71,
      studio: '주 스튜디오',
      name: '증명사진',
      description: '증명사진에 대한 설명입니다.',
      price: 31000,
      created_at: null,
      updated_at: null,
    },
    {
      id: 72,
      studio: '주 스튜디오',
      name: '프로필사진',
      description: '프로필사진에 대한 설명입니다.',
      price: 140000,
      created_at: null,
      updated_at: null,
    },
  ],
  options: [],
  created_at: '2024-12-20T16:00:39',
  updated_at: '2024-12-27T13:54:40.999963',
  dayOfWeek: 'MON',
  bookmark: true,
};

describe('StudioItem Component', () => {
  test('스튜디오 정보를 출력해야 합니다.', () => {
    render(<StudioItem item={mockStudio} isLast={false} />);

    // 스튜디오 이름
    expect(screen.findByText('주 스튜디오'));
    // 스튜디오 평점
    expect(screen.findByText('3.2'));

    // 스튜디오 후기 수
    expect(screen.findByText('278개의 평가'));

    // 스튜디오 주소
    expect(screen.findByText('성북구 동소문로 35 2층'));

    // 스튜디오 영업 시간
    expect(screen.findByText('09:00 - 18:00'));
  });

  test('메뉴 중 최저가를 계산해야 합니다.', () => {
    render(<StudioItem item={mockStudio} isLast={false} />);

    // 스튜디오 최저가 계산
    expect(screen.findByText('31000원~'));
  });

  test('북마크 설정 여부를 렌더링해야 합니다.', () => {
    render(<StudioItem item={mockStudio} isLast={false} />);

    // 북마크 버튼
    const bookmarkButton = screen.getByRole('button', { name: /북마크 해제하기/i });
    expect(bookmarkButton).toBeInTheDocument();

    // 스튜디오 북마크 수
    expect(screen.findByText('297'));
  });

  test('북마크 버튼 클릭 시 북마크 설정 여부를 변경해야 합니다.', () => {
    render(<StudioItem item={mockStudio} isLast={false} />);

    // 북마크 버튼
    const bookmarkButton = screen.getByRole('button', { name: /북마크 해제하기/i });
    expect(bookmarkButton).toBeInTheDocument();

    // 초기 상태: 북마크 해제
    expect(screen.findByText('북마크 해제'));

    // 버튼 클릭
    fireEvent.click(bookmarkButton);

    // 변경 상태: 북마크 설정
    expect(screen.findByText('북마크 등록'));
  });

  test('이미지 슬라이더에 이미지를 최대 5개 렌더링해야 합니다.', () => {
    render(<StudioItem item={mockStudio} isLast={false} />);

    const images = screen.getAllByAltText(/이미지/i); // alt 속성을 이용한 이미지 찾기
    expect(images.length).toBeLessThanOrEqual(5);

    expect(images[0]).toHaveAttribute('src', 'https://i.imgur.com/BMDwLgQ.jpeg');
    expect(images[1]).toHaveAttribute('src', 'https://i.imgur.com/7C4GSF4.jpeg');
    expect(images[2]).toHaveAttribute('src', 'https://i.imgur.com/yjmxVej.jpeg');
    expect(images[3]).toHaveAttribute('src', 'https://i.imgur.com/zwoRb86.jpeg');
    expect(images[4]).toHaveAttribute('src', 'https://i.imgur.com/HWtmnvf.jpeg');
  });
});
