import StudioList from '@components/Studio/StudioList';
import { useGetStudios } from '@hooks/useGetStudios';
import { UseQueryResult } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { IStudioItem, IStudioRes } from 'types/types';
import { describe, test, vi } from 'vitest';

// Virtuoso - Mock 처리
vi.mock('react-virtuoso', () => ({
  Virtuoso: ({ data, endReached, itemContent }: any) => (
    <div
      data-testid="virtuoso-container"
      style={{ height: '500px', overflowY: 'scroll' }}
      onScroll={() => {
        // 스크롤이 끝에 도달했을 때 endReached 호출
        if (endReached) endReached();
      }}
    >
      {data.map((item: any, index: number) => (
        <div key={item.id} data-testid="studio-item">
          {itemContent(index, item)}
        </div>
      ))}
    </div>
  ),
}));

// useGetStudio hook - Mock 처리
vi.mock('@hooks/useGetStudios', () => ({
  useGetStudios: vi.fn(),
}));

const mockedStudios: IStudioRes<IStudioItem> = {
  content: [
    {
      id: 146,
      vibe: '시크',
      addressSi: '서울시',
      addressGu: '성북구',
      name: '주 스튜디오',
      description:
        '안녕하세요 ZOOS.TUDIO 입니다.100프로 예약제입니다.(문자 or https://open.kakao.com/o/su2iLTDd)증명/여권사진 : 3만원 (1:1후보정부터 출력까지해드립니다!)100프로 예약제입니다.전날 혹은 2~3시간전에 연락주시면 감사하겠습니다:) 프로필 촬영 : 1컨셉 13만원 2컨셉 18만원입니다. 인스타:@zoos.tudio leejoopilstudio.com',
      address: '동소문로 35 2층',
      phone: '010-0000-0035',
      view_count: 211,
      rating: 3.2,
      bookmark_count: 298,
      review_count: 278,
      latitude: 37.589741,
      longitude: 127.00768,
      open_time: '09:00:00',
      close_time: '18:00:00',
      subVibe: '러블리',
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
      options: [
        {
          id: 5,
          name: 'CHANGING_ROOM',
          description: '옵션 설명 입니다',
          created_at: '2024-12-20T14:40:32',
          updated_at: '2024-12-20T14:40:26',
        },
        {
          id: 6,
          name: 'DRESSING_ROOM',
          description: '옵션 설명 입니다',
          created_at: '2024-12-20T14:40:32',
          updated_at: '2024-12-20T14:40:26',
        },
        {
          id: 7,
          name: 'HAIR_MAKEUP',
          description: '옵션 설명 입니다',
          created_at: '2024-12-20T14:40:32',
          updated_at: '2024-12-20T14:40:26',
        },
        {
          id: 8,
          name: 'INDIVIDUAL_EDITING',
          description: '옵션 설명 입니다',
          created_at: '2024-12-20T14:40:32',
          updated_at: '2024-12-20T14:40:26',
        },
      ],
      created_at: '2024-12-20T16:00:39',
      updated_at: '2024-12-27T13:54:40.999963',
      dayOfWeek: 'MON',
      bookmark: false,
    },
    {
      id: 175,
      vibe: '청순',
      addressSi: '서울시',
      addressGu: '광진구',
      name: '미에르스튜디오',
      description: 'this is sample description_67',
      address: '자양동 653-5 3층',
      phone: '010-0000-0066',
      view_count: 70,
      rating: 4.1,
      bookmark_count: 291,
      review_count: 42,
      latitude: null,
      longitude: null,
      open_time: '09:00:00',
      close_time: '18:00:00',
      subVibe: '상큼',
      portfolios: [],
      menus: [
        {
          id: 129,
          studio: '미에르스튜디오',
          name: '증명사진',
          description: '증명사진에 대한 설명입니다.',
          price: 40000,
          created_at: null,
          updated_at: null,
        },
        {
          id: 130,
          studio: '미에르스튜디오',
          name: '프로필사진',
          description: '프로필사진에 대한 설명입니다.',
          price: 150000,
          created_at: null,
          updated_at: null,
        },
      ],
      options: [],
      created_at: null,
      updated_at: null,
      dayOfWeek: 'THU',
      bookmark: true,
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalPages: 1,
  totalElements: 2,
  last: false,
  size: 20,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  numberOfElements: 2,
  first: true,
  empty: false,
};

const mockedMoreStudios: IStudioRes<IStudioItem> = {
  content: [
    {
      id: 147,
      vibe: '시크',
      addressSi: '서울시',
      addressGu: '금천구',
      name: '오리우스씨네페이시스',
      description: 'this is sample description_37',
      address: '가산디지털1로 142 가산 더 스카이밸리 1차 지하1층 111호',
      phone: '010-0000-0036',
      view_count: 21,
      rating: 4.6,
      bookmark_count: 230,
      review_count: 112,
      latitude: null,
      longitude: null,
      open_time: '09:00:00',
      close_time: '18:00:00',
      subVibe: '시크',
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
          id: 73,
          studio: '오리우스씨네페이시스',
          name: '증명사진',
          description: '증명사진에 대한 설명입니다.',
          price: 41000,
          created_at: null,
          updated_at: null,
        },
        {
          id: 74,
          studio: '오리우스씨네페이시스',
          name: '프로필사진',
          description: '프로필사진에 대한 설명입니다.',
          price: 165000,
          created_at: null,
          updated_at: null,
        },
      ],
      options: [],
      created_at: null,
      updated_at: null,
      dayOfWeek: 'TUE',
      bookmark: false,
    },
    {
      id: 189,
      vibe: '청순',
      addressSi: '서울시',
      addressGu: '마포구',
      name: '수상한 사진관',
      description: 'this is sample description_81',
      address: '홍익로6길 23 B1',
      phone: '010-0000-0080',
      view_count: 290,
      rating: 0.9,
      bookmark_count: 230,
      review_count: 191,
      latitude: null,
      longitude: null,
      open_time: '09:00:00',
      close_time: '18:00:00',
      subVibe: '선명한',
      portfolios: [],
      menus: [
        {
          id: 157,
          studio: '수상한 사진관',
          name: '증명사진',
          description: '증명사진에 대한 설명입니다.',
          price: 49000,
          created_at: null,
          updated_at: null,
        },
        {
          id: 158,
          studio: '수상한 사진관',
          name: '프로필사진',
          description: '프로필사진에 대한 설명입니다.',
          price: 140000,
          created_at: null,
          updated_at: null,
        },
      ],
      options: [],
      created_at: null,
      updated_at: null,
      dayOfWeek: 'THU',
      bookmark: false,
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  totalPages: 1,
  totalElements: 2,
  last: false,
  size: 20,
  number: 0,
  sort: {
    empty: true,
    sorted: false,
    unsorted: true,
  },
  numberOfElements: 2,
  first: true,
  empty: false,
};

describe('StudioList Component', () => {
  test('스튜디오 리스트를 출력해야 합니다.', () => {
    // useGetStudios Mock 구현
    (useGetStudios as jest.Mock).mockReturnValue({
      data: mockedStudios,
      isLoading: false,
      isFetching: false,
    } as UseQueryResult<IStudioRes<IStudioItem>>);

    render(<StudioList mode="filter" searchParams={new URLSearchParams()} />);

    // findByText: 비동기적으로 동작 => 데이터가 렌더링될 때까지 대기
    expect(screen.findByText(/주 스튜디오/i));
    expect(screen.findByText(/미에르스튜디오/i));
  });

  test('스크롤을 끝까지 내리면 새로운 스튜디오 리스트를 로드해야 합니다.', () => {
    (useGetStudios as jest.Mock).mockReturnValue({
      data: mockedStudios,
      isLoading: false,
      isFetching: false,
    } as UseQueryResult<IStudioRes<IStudioItem>>);

    render(<StudioList mode="filter" searchParams={new URLSearchParams()} />);

    expect(screen.findByText(/주 스튜디오/i));
    expect(screen.findByText(/미에르스튜디오/i));

    // 스크롤을 끝까지 내리는 시뮬레이션 (데이터가 끝에 도달하면)
    const virtuosoContainer = screen.getByTestId('virtuoso-container');
    fireEvent.scroll(virtuosoContainer, {
      target: { scrollY: virtuosoContainer.scrollHeight },
    });

    // 스크롤이 하단에 닿으면 Load More 후 새로운 스튜디오 리스트를 Mock 처리
    (useGetStudios as jest.Mock).mockReturnValueOnce({
      data: mockedMoreStudios,
      isLoading: false,
      isFetching: false,
    } as UseQueryResult<IStudioRes<IStudioItem>>);

    expect(screen.findByText(/오리우스씨네페이시스/i));
    expect(screen.findByText(/수상한 사진관/i));
  });

  test('데이터를 로딩 중일 때 로딩 컴포넌트를 출력해야 합니다.', () => {
    // Loading & Fetching의 경우
    (useGetStudios as jest.Mock).mockReturnValueOnce({
      isLoading: true,
      isFetching: true,
    } as UseQueryResult<IStudioRes<IStudioItem> | null>);

    render(<StudioList mode="filter" searchParams={new URLSearchParams()} />);

    // 로딩 메시지가 화면에 표시되는지 확인
    expect(screen.findByText(/로딩 컴포넌트!/i));
  });

  test('검색 결과가 없을 때 "EmptyMessage" 컴포넌트를 출력해야 합니다.', () => {
    // 데이터가 없는 경우
    (useGetStudios as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      isFetching: false,
    } as UseQueryResult<IStudioRes<IStudioItem> | null>);

    render(<StudioList mode="filter" searchParams={new URLSearchParams()} />);

    // 로딩 메시지가 화면에 표시되는지 확인
    expect(screen.findByText(/스튜디오 조회 결과가 없습니다./i));
  });
});
