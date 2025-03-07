/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { changeformatDateForUi } from '@store/useSelectDateStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdR, TypoBodyMdSb, TypoCapSmM, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { useSearchParams } from 'react-router-dom';

interface IButtonType {
  windowType: 'mo' | 'pc';
}

const BookingButton = ({ type }: { type: 'mo' | 'pc' }) => {
  const modal = useModal();
  const [searchParams] = useSearchParams();
  const searchParamsDateTime = changeformatDateForUi({
    date: searchParams.get('date')!,
    time: searchParams.getAll('times'),
  });

  return (
    <button
      type="button"
      className={type}
      onClick={() => modal.open()}
      css={css`
        ${mqMin(breakPoints.pc)} {
          margin: 1.1rem 0 1.2rem;
        }
      `}
    >
      <ButtonTitleStyle windowType={type}>
        <span css={type === 'mo' ? TypoTitleSmS : TypoBodyMdSb}>
          {searchParams.get('addressGu') || '서울전체'}
        </span>
      </ButtonTitleStyle>
      <ButtonDesStyle css={type === 'mo' ? TypoBodyMdR : TypoCapSmM}>
        {searchParamsDateTime || '예약 날짜와 시간을 선택해주세요.'}
      </ButtonDesStyle>
    </button>
  );
};

const ButtonTitleStyle = styled.span<IButtonType>`
  display: flex;
  align-items: center;
  color: ${(props) =>
    props.windowType === 'mo' ? variables.colors.black : variables.colors.white};

  &::after {
    content: '';
    width: ${(props) => (props.windowType === 'mo' ? '2.4rem' : '1.6rem')};
    height: ${(props) => (props.windowType === 'mo' ? '2.4rem' : '1.6rem')};
    background: ${(props) =>
      props.windowType === 'mo'
        ? 'url("/img/icon-arrowdown-black.svg") no-repeat center / 1.6rem 0.9rem'
        : 'url("/img/icon-arrowdown-white.svg") no-repeat center / 1.1rem 0.6rem'};
  }
`;

const ButtonDesStyle = styled.span`
  color: ${variables.colors.gray600};
`;

export default BookingButton;
