/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TypoBodyMdR } from '@styles/Common';
import variables from '@styles/Variables';
import { useState } from 'react';

// 별점 상수 5개
const TOTAL_STARS = 5;

// 별점 텍스트 점수 따라 변환
const RATING_TEXT: { [key: number]: string } = {
  0: '별점을 입력해주세요',
  1: '별로였어요',
  2: '그저 그랬어요',
  3: '괜찮았어요',
  4: '좋았어요',
  5: '최고였어요!',
};

// 별점 스타일
const starStyles = css`
  margin-right: 5px;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;

// 별점 컴포넌트 부모 컴포넌트로 전송 함수
interface StarInputProps {
  onRatingChange: (rating: number) => void;
}

/** 별점 등록 컴포넌트  */
const StarInput = ({ onRatingChange }: StarInputProps) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (clickedIndex: number) => {
    const newRating = clickedIndex + 1;
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div
      css={css`
        margin: 1rem 0rem;
        gap: 0.4rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      `}
    >
      {Array.from({ length: TOTAL_STARS }, (_, index) => (
        <img
          key={index}
          src={index < rating ? '/img/icon-star-filled.svg' : '/img/icon-star-notfilled.svg'}
          alt={`별점 ${index + 1}점`}
          css={starStyles}
          onClick={() => handleStarClick(index)}
        />
      ))}
      <span
        css={css`
          ${TypoBodyMdR}
          color: ${variables.colors.gray600};
        `}
      >
        {RATING_TEXT[rating]}
      </span>
    </div>
  );
};

export default StarInput;
