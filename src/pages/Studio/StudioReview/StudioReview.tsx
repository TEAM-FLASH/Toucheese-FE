/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Hidden, TypoCapSmR, TypoTitleXsM } from '@styles/Common';
import { useParams, useSearchParams } from 'react-router-dom';
import StudioReviewImageList from './components/StudioReviewImageList';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioReviewItem from './components/StudioReviewItem';
import { css } from '@emotion/react';
import StudioReviewCategories from './components/StudioReviewCategories';
import { IReviewImages } from 'types/types';
import { useStudioReviews } from '@hooks/useStudioReviews';
import Header from '@components/Header/Header';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import variables from '@styles/Variables';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { useGetStudioDetail } from '@hooks/useGetStudioDetail';
import useStudioDataStore from '@store/useStudioDataStore';

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

  // 스튜디오 상세 정보 가져오기
  const { data: studioDetailData } = useGetStudioDetail(`${_id}`);
  const { studioDetail, setStudioDetail } = useStudioDataStore();

  /** 스튜디오 데이터 session Storage에 저장 */
  useEffect(() => {
    if (!studioDetail[`${_id}`] && studioDetailData) {
      setStudioDetail(`${_id}`, studioDetailData);
    }
  }, [studioDetailData, _id, studioDetail, setStudioDetail]);

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

      <Header title={studioDetailData?.name} fixed={true} />
      <StudioNavigator _id={_id || ''} />

      <div css={boxLayoutStyle}>
        <div css={studioPaddingTop}>
          <ReviewPhotosWrapperStyle>
            <ReviewTitleWrapperStyle>
              <h2 css={TypoTitleXsM}>리뷰 사진 모아보기</h2>
              <p css={TypoCapSmR}>{totalImageNum}개</p>
            </ReviewTitleWrapperStyle>
            {/* 리뷰 이미지 모아보기 컴포넌트 */}
            <StudioReviewImageList pageId={_id} samplePhotoList={samplePhotoList} />
          </ReviewPhotosWrapperStyle>

          <h2 css={Hidden}>리뷰 목록</h2>
          {/* 스튜디오 리뷰 카테고리 */}
          <StudioReviewCategories
            avgRating={Number(processedAvgRating)}
            totalReviewNum={totalReviewNum}
            menuNameList={menuNameList}
            menuIdList={menuIdList || []}
            onFilterChange={handleFilterChange}
          />

          {/* 리뷰 리스트가 없는 경우 예외 처리 */}
          {reviewLists.length === 0 ? (
            <NoReviewContainerStyle>
              <NoReviewTextStyle>아직 작성된 리뷰가 없습니다</NoReviewTextStyle>
            </NoReviewContainerStyle>
          ) : (
            /* 리뷰 리스트 렌더링  */
            reviewLists.map((review: Review, index: number) => (
              <StudioReviewItem
                showMenuName={true}
                key={review.id}
                review={review}
                isLast={index === reviewLists.length - 1}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default StudioReview;

const boxLayoutStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  ${mqMin(breakPoints.pc)} {
    flex-direction: row;
    gap: 2rem;
    padding: 0 ${variables.layoutPadding};
    margin: 0 auto;

    & > div:first-of-type {
      width: 100%;
      box-sizing: border-box;
    }

    .pc-studio-info {
      width: 30%;
      max-width: 30%;
      position: sticky;
      top: ${variables.headerHeight};
      height: fit-content;
      box-sizing: border-box;
    }
  }
`;

const ReviewPhotosWrapperStyle = styled.div`
  width: 100%;
  margin-top: 2.2rem;
  box-sizing: border-box;
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
  width: 100%;
  box-sizing: border-box;

  ${mqMin(breakPoints.pc)} {
    padding-top: 0;
  }
`;

const NoReviewContainerStyle = styled.div`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${variables.colors.gray100};
  border-radius: 4px;
  margin-top: 2rem;
`;

const NoReviewTextStyle = styled.p`
  color: ${variables.colors.gray500};
  ${TypoCapSmR}
`;
