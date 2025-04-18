/** @jsxImportSource @emotion/react */

import DimSwiper, { SlideImgBox } from '@components/Swiper/DimSwiper';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { breakPoints, mqMax, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { formatTimeAgo } from '@utils/formatTimeAgo';
import { useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { IReviewImages } from 'types/types';
import StarRating from './StarRating';

const ReviewSwiper = ({ data }: { data: IReviewImages[] }) => {
  const [slideSet, setSlideSet] = useState<IReviewImages[]>([]);

  const renderSlides = () => {
    return slideSet.map((slide) => (
      <SwiperSlideStyle key={slide.id} virtualIndex={slide.id}>
        <div css={reviewUser}>
          <p className="userName">{slide.userName}</p>
          <p className="date">{formatTimeAgo(slide.created_at)}</p>
          <StarRating rating={slide.rating || 0} />
        </div>

        <div css={[SlideImgBox, reviewImgBox]}>
          <img src={slide.url} alt={`리뷰 이미지 ${slide.id}`} />
        </div>

        <div css={reviewDesc}>
          <h2 css={TypoTitleSmS}>{slide.menuName}</h2>
          <p className="option">컷 추가 수정</p>
          <p>{slide.reviewContent}</p>
        </div>
      </SwiperSlideStyle>
    ));
  };

  return (
    <DimSwiper<IReviewImages> data={data} setSlideSet={setSlideSet}>
      {slideSet && renderSlides()}
    </DimSwiper>
  );
};

export default ReviewSwiper;

const SwiperSlideStyle = styled(SwiperSlide)`
  ${mqMin(breakPoints.pc)} {
    display: grid !important;
    grid-template: 4rem auto / 1fr 1fr;
    gap: 0 ${variables.layoutPadding};
  }
`;

const reviewUser = css`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  ${TypoBodyMdM}

  .userName {
    color: ${variables.colors.gray300};
  }
  .date {
    color: ${variables.colors.gray500};
  }

  ${mqMax(breakPoints.moMax)} {
    margin-bottom: 2.6rem;
  }
`;

const reviewImgBox = css`
  ${mqMin(breakPoints.pc)} {
    grid-row: 1/3;
    aspect-ratio: 374 / 440;

    img {
      width: auto;
      height: 100%;
    }
  }
`;

const reviewDesc = css`
  .option {
    color: ${variables.colors.gray600};
    margin-top: 0.2rem;
    margin-bottom: 0.8rem;

    ${mqMin(breakPoints.pc)} {
      margin-bottom: 1.6rem;
    }
  }
`;
