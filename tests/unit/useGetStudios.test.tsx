import { useGetStudios } from '@hooks/useGetStudios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook, waitFor } from '@testing-library/react';
import { IStudioItem, IStudioRes } from 'types/types';
import { describe, test, vi } from 'vitest';

// Response - Mock 처리
const mockedStudios: IStudioRes<IStudioItem> = {
  content: [
    {
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
      created_at: null,
      updated_at: null,
      dayOfWeek: 'MON',
      bookmark: true,
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

// fetch 함수 - Mock 처리
global.fetch = vi.fn();

// useGetStudios를 호출하는 테스트 컴포넌트
const TestComponent = ({
  pageNum,
  mode,
  params,
}: {
  pageNum: number;
  mode: 'filter' | 'search/result';
  params: string;
}) => {
  const { data, isError, isLoading } = useGetStudios(pageNum, mode, params);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;
  return <div>{data?.content.map((studio) => <div key={studio.id}>{studio.name}</div>)}</div>;
};

describe('useGetStudios Hook', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  // 각 테스트 후 Mock 초기화
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('주어진 params를 바탕으로 올바른 API를 호출해야 합니다.', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockedStudios,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent pageNum={0} mode="filter" params="" />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_TOUCHEESE_API}/studio/filter?size=${import.meta.env.VITE_TOUCHEESE_STUDIO_LIMIT}`,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    });
  });

  test('스튜디오 목록을 성공적으로 fetch해야 합니다.', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockedStudios,
    });

    const { result } = renderHook(() => useGetStudios(0, 'filter', 'vibeName=시크'), { wrapper });

    // Query가 성공적으로 데이터를 가져올 때까지 대기
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // 결과 확인
    expect(result.current.data).toEqual(mockedStudios);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('vibeName=시크'),
      expect.objectContaining({ method: 'GET' }),
    );
  });
});
