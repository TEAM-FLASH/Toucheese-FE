/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StudioReviewItem, { Review } from '../StudioReview/components/StudioReviewItem';

const StudioMenuDetailReview = ({
  reviewItem = [],
  rating = 0,
}: {
  reviewItem: Review[];
  rating: number;
}) => {
  const reviewList = reviewItem.map((item) => (
    <StudioReviewItem key={item.id} review={item} showMenuName={false} />
  ));

  return (
    <>
      <div css={ReviewrapperStyle}>
        <section css={ReviewHead}>
          <div className="reviewRating">
            <img src="/img/icon-rating.svg" alt="평점 아이콘" />
            <span>{Math.trunc(rating * 10) / 10}</span>
          </div>
          <p>{reviewItem.length}개의 리뷰</p>
        </section>
        <section>{reviewList}</section>
      </div>
    </>
  );
};

export default StudioMenuDetailReview;

const ReviewrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.8rem 0;
`;

const ReviewHead = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  .reviewRating {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`;
