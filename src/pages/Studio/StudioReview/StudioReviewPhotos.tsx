/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import MasonryList from '@components/Masonry/Masonry';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import DimmedModal from '@pages/Studio/components/DimmedModal';
import { useDimSwiperStore } from '@store/useDimSwiperStore';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useSearchParams } from 'react-router-dom';
import { IReviewImages } from 'types/types';
import ReviewSwiper from './components/ReviewSwiper';
import variables from '@styles/Variables';
import { css } from '@emotion/react';

interface IReviewImagesResponse {
  totalElements: number;
  totalPages: number;
  imageDtos: IReviewImages[];
  menuNameList: string[];
  menuIdList: number[];
}

/** 리뷰 사진 모아보기 페이지 */
const StudioReviewPhotos = () => {
  const { _id } = useParams(); // 스튜디오 아이디
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [_, setSearchParams] = useSearchParams();

  const setSelectedId = useDimSwiperStore((state) => state.setSelectedId);
  const handleClick = (clickedId: number) => {
    setSelectedId(clickedId);
    open();
  };

  const { open } = useModal(1);
  const fetchReviewImage = async () => {
    // 리뷰사진 모아보기 조회
    const url = new URL(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${_id}/reviewImage`);

    if (selectedMenuId) {
      url.searchParams.append('menuId', selectedMenuId.toString());
      setSearchParams(url.searchParams);
    } else {
      setSearchParams({});
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('리뷰 이미지를 불러오는데 실패했습니다');
    }
    return response.json();
  };

  const { data: reviewImages } = useQuery<IReviewImagesResponse>({
    queryKey: ['reviewImages', _id, selectedMenuId],
    queryFn: fetchReviewImage,
    enabled: !!_id,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    retry: 3,
  });

  if (!reviewImages) return null;

  return (
    <>
      {reviewImages && (
        <Helmet>
          <title>{`리뷰 사진모아보기 - ${reviewImages.totalElements}개`}</title>
          <meta property="og:title" content={`스튜디오 리뷰 사진모아보기`} />
        </Helmet>
      )}

      <Header title="리뷰 사진 모아보기" />
      <div css={studioPaddingTop}>
        <StudioReviewPhotosContainerStyle>
          <ButtonWrapperStyle>
            <Button
              text="전체"
              variant="white"
              active={selectedMenuId === null}
              size="small"
              width="fit"
              onClick={() => setSelectedMenuId(null)}
            />
            {reviewImages.menuNameList.map((menu, index) => (
              <Button
                key={menu}
                text={menu}
                variant="white"
                active={selectedMenuId === reviewImages.menuIdList[index]}
                size="small"
                width="fit"
                onClick={() => setSelectedMenuId(reviewImages.menuIdList[index])}
              />
            ))}
          </ButtonWrapperStyle>

          <MasonryList>
            {reviewImages.imageDtos.map(({ id, url }) => (
              <div key={id} onClick={() => handleClick(id)}>
                <picture>
                  <source srcSet={url.replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
                  <img src={url} alt={`리뷰 이미지 ${id}`} />
                </picture>
              </div>
            ))}
          </MasonryList>

          <DimmedModal>
            <ReviewSwiper data={reviewImages.imageDtos} />
          </DimmedModal>
        </StudioReviewPhotosContainerStyle>
      </div>
    </>
  );
};

export default StudioReviewPhotos;

const StudioReviewPhotosContainerStyle = styled.div`
  width: 100%;
`;
const ButtonWrapperStyle = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 1.2rem 0;
  width: 100%;
`;
const studioPaddingTop = css`
  padding-top: ${variables.headerHeight};
`;
