import { useQuery } from '@tanstack/react-query';
import { IReviewImages } from 'types/types';

interface Review {
  content: string;
  created_at: string;
  id: number;
  imageExists: boolean;
  menuId: number;
  menuName: string;
  rating: number;
  reviewImages: IReviewImages[];
  updated_at: string;
  userId: number;
  userName: string;
}

interface StudioReviewsResponse {
  reviewList: Review[];
  totalImageNum: number;
  avgRating: number;
  totalReviewNum: number;
  samplePhotoList: string[];
  menuNameList: string[];
  menuIdList?: number[];
}

// 스튜디오 리뷰를 불러오는 fetch hooks
export const useStudioReviews = (studioId: string | undefined, menuId: number | null) => {
  const fetchStudioReviews = async () => {
    const url = new URL(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${studioId}/reviews`);

    if (menuId) {
      url.searchParams.append('menuId', menuId.toString());
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('리뷰를 불러오는데 실패했습니다');
    }
    return response.json();
  };

  return useQuery<StudioReviewsResponse>({
    queryKey: ['studioReviews', studioId, menuId],
    queryFn: fetchStudioReviews,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    retry: 2,
    enabled: !!studioId,
    throwOnError: true,
  });
};
