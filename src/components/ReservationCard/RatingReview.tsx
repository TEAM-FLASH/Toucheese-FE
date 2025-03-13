/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import { TypoCapXsR } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';
import { IResvItem } from 'types/types';

const RatingReview = ({
  ratingValue = 0,
  reservaionData,
}: {
  ratingValue: number | undefined;
  reservaionData?: IResvItem | null;
}) => {
  const navigate = useNavigate();

  const ratingComment = (ratingValue: number) => {
    const comments: Record<number, string> = {
      1: '별로였어요.',
      2: '그저 그랬어요.',
      3: '괜찮았어요.',
      4: '좋았어요.',
      5: '최고였어요!',
    };

    return comments[ratingValue] || '촬영은 어떠셨나요? 사진관 이용 리뷰를 남겨주세요.';
  };

  return (
    <div css={CardRatingStarStyle}>
      <div className="ratingView">
        <p>{ratingComment(ratingValue)}</p>
        <div className="ratingList">
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              key={i}
              src={`/img/icon-rating${i < ratingValue ? '.svg' : '-disabled.svg'}`}
              alt={i < ratingValue ? '평가됨' : '미평가'}
            />
          ))}
        </div>
      </div>
      {ratingValue <= 0 && (
        <div onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={() =>
              navigate(`/reservation/${reservaionData?.studioId}/review/write`, {
                state: { reservaionData },
              })
            }
            text="리뷰 남기기"
            variant="white"
            size="xsmall"
            width="fit"
          />
        </div>
      )}
    </div>
  );
};

export default RatingReview;

const CardRatingStarStyle = css`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  border-top: 0.1rem solid ${variables.colors.gray300};
  padding-top: 1rem;

  .ratingView {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    & p {
      ${TypoCapXsR}
      color: ${variables.colors.gray800};
    }

    .ratingList {
      display: flex;
      gap: 0.2rem;
    }
  }
`;
