/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { TypoBodyMdM, TypoBodyMdSb, TypoCapSmR } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';
import { IMenuListRes } from 'types/types';

const StudioMenuItem = ({
  StudioId,
  data,
}: {
  StudioId: string | undefined;
  data: IMenuListRes | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <section
        css={MenuItemWrapperStyle}
        onClick={() => navigate(`/studio/${StudioId}/menu/${data?.id}`)}
      >
        <div css={MenuCoverStyle}>
          <img src={`${data?.menuImages[0].url}`} alt="메뉴 대표 사진" />
        </div>
        <div css={MenuDescStyle}>
          <div css={MenuHeadStyle}>
            <h2>{data?.name}</h2>
            <p>{data?.description}</p>
          </div>
          <div css={MenuPriceReviewStyle}>
            <p>{data?.price.toLocaleString('ko-KR')}원</p>
            <span>리뷰 {data?.reviewCount}개</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudioMenuItem;

const MenuItemWrapperStyle = css`
  display: flex;
  gap: 1.4rem;
  padding: 1.4rem 0;
  box-sizing: border-box;
  border-bottom: 0.1rem solid ${variables.colors.gray300};
  cursor: pointer;
`;

const MenuCoverStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9.4rem;
  flex-shrink: 0;

  & img {
    aspect-ratio: 94 / 118;
    object-fit: cover;
  }
`;

const MenuDescStyle = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
`;

const MenuHeadStyle = css`
  & h2 {
    ${TypoBodyMdM}
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;

    &::after {
      content: '';
      display: inline-block;
      width: 1.6rem;
      height: 1.6rem;
      background-image: url(/img/icon-chevronright.svg);

      background-position: center;
      background-repeat: no-repeat;
      background-size: 0.6rem 1.1rem;
    }
  }

  & p {
    display: -webkit-box;
    ${TypoCapSmR}
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: ${variables.colors.gray800};
  }
`;

const MenuPriceReviewStyle = css`
  & p {
    ${TypoBodyMdSb}
    margin-bottom:.4rem;
  }

  & span {
    ${TypoCapSmR}
    color: ${variables.colors.gray700};
  }
`;
