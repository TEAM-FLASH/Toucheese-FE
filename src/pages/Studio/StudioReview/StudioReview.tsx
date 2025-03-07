/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { TypoCapSmR, TypoTitleXsM } from '@styles/Common';
import { useParams, useSearchParams } from 'react-router-dom';
import StudioReviewImageList from './components/StudioReviewImageList';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioReviewItem from './components/StudioReviewItem';
import { css } from '@emotion/react';
import StudioReviewCategories from './components/StudioReviewCategories';
import { IReviewImages } from 'types/types';
import { useStudioReviews } from '@hooks/useStudioReviews';
import Header from '@components/Header/Header';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import variables from '@styles/Variables';
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
  const { data } = useStudioReviews(_id, selectedMenuId);
  const [_, setSearchParams] = useSearchParams();

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
      <div css={studioPaddingTop}>
        <ReviewPhotosWrapperStyle>
          <ReviewTitleWrapperStyle>
            <h1 css={TypoTitleXsM}>리뷰 사진 모아보기</h1>
            <p css={TypoCapSmR}>{totalImageNum}개</p>
          </ReviewTitleWrapperStyle>
          {/* 리뷰 이미지 모아보기 컴포넌트 */}

          <StudioReviewImageList pageId={_id} samplePhotoList={samplePhotoList} />
        </ReviewPhotosWrapperStyle>
        {/* 스튜디오 리뷰 카테고리 */}
        <StudioReviewCategories
          avgRating={Number(processedAvgRating)}
          totalReviewNum={totalReviewNum}
          menuNameList={menuNameList}
          menuIdList={menuIdList || []}
          onFilterChange={handleFilterChange}
        />
        {/* 리뷰 리스트 렌더링  */}
        {reviewLists.map((review: Review, index: number) => (
          <StudioReviewItem
            showMenuName={true}
            key={review.id}
            review={review}
            isLast={index === reviewLists.length - 1}
          />
        ))}
      </div>
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
const studioPaddingTop = css`
  padding-top: ${variables.headerHeight};
`;
