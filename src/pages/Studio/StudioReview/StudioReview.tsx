/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR, TypoTitleXsM } from '@styles/Common';
import { useParams, useSearchParams } from 'react-router-dom';
import StudioReviewImageList from './components/StudioReviewImageList';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioReviewItem from './components/StudioReviewItem';
import StudioReviewCategories from './components/StudioReviewCategories';
import { IReviewImages } from 'types/types';
import { useStudioReviews } from '@hooks/useStudioReviews';
import Header from '@components/Header/Header';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// 리뷰 데이터의 타입 정의
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
  menuIdList?: number[];
}

/** 리뷰 페이지 (부모) */
const StudioReview = () => {
  const { _id } = useParams();
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const { data, isLoading, error } = useStudioReviews(_id, selectedMenuId);
  const [_, setSearchParams] = useSearchParams();
  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return null;

  const {
    reviewList: reviewLists,
    totalImageNum,
    avgRating,
    totalReviewNum,
    samplePhotoList,
    menuNameList,
    menuIdList,
  } = data;
  const processedAvgRating = avgRating.toFixed(1);

  /** 드랍다운에서 선택된 요소에 따라 메뉴 아이디 바꾸는 함수 */
  const handleFilterChange = (menuId: number | null) => {
    setSelectedMenuId(menuId);
    if (menuId === null) {
      setSearchParams({});
    } else {
      setSearchParams({ menuId: menuId.toString() });
    }
  };

  return (
    <>
      {data && (
        <Helmet>
          <title>{`스튜디오 리뷰 - ${totalReviewNum}개의 리뷰`}</title>
          <meta
            name="description"
            content={`평균 평점 ${processedAvgRating}점, ${totalReviewNum}개의 리뷰와 ${totalImageNum}개의 사진이 있는 스튜디오 리뷰입니다.`}
          />
          <meta property="og:title" content={`스튜디오 리뷰 | ${totalReviewNum}개의 리뷰`} />
          <meta
            property="og:description"
            content={`평균 평점 ${processedAvgRating}점, ${totalReviewNum}개의 리뷰와 ${totalImageNum}개의 사진이 있는 스튜디오 리뷰입니다.`}
          />
        </Helmet>
      )}

      <Header title="리뷰" />
      <StudioNavigator _id={_id || ''} />
      <ReviewPhotosWrapperStyle>
        <ReviewTitleWrapperStyle>
          <h1 css={TypoTitleXsM}>리뷰 사진 모아보기</h1>
          <p css={TypoCapSmR}>{totalImageNum}개</p>
        </ReviewTitleWrapperStyle>
        <StudioReviewImageList pageId={_id} samplePhotoList={samplePhotoList} />
      </ReviewPhotosWrapperStyle>

      <StudioReviewCategories
        avgRating={Number(processedAvgRating)}
        totalReviewNum={totalReviewNum}
        menuNameList={menuNameList}
        menuIdList={menuIdList || []}
        onFilterChange={handleFilterChange}
      />
      {reviewLists.map((review: Review, index: number) => (
        <StudioReviewItem
          showMenuName={true}
          key={review.id}
          review={review}
          isLast={index === reviewLists.length - 1}
        />
      ))}
    </>
  );
};

export default StudioReview;

const ReviewPhotosWrapperStyle = styled.div`
  width: 100%;
  margin-top: 2.2rem;
`;

const ReviewTitleWrapperStyle = styled.div`
  display: flex;
  gap: 0.8rem;

  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
