/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import Button from '@components/Button/Button';
import { TypoCapSmR, TypoTitleSmS } from '@styles/Common';
import useReservationStore from '@store/useReservationStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';

interface IReservationButton {
  text: string;
  type: 'button' | 'submit';
  onClick: () => void;
  disabled?: boolean;
  testId?: string;
}

const ReservationFooter = ({
  text = '예약하기',
  type = 'button',
  onClick,
  disabled = false,
  testId = '',
}: IReservationButton) => {
  const { totalPrice } = useReservationStore();

  return (
    <div css={FixedBtnBoxStyle}>
      <div className="totalPrice">
        <h2>총 결제금액</h2>
        <h3>{totalPrice?.toLocaleString('ko-KR')}원</h3>
      </div>

      <Button
        text={text}
        variant="gray"
        active={!disabled}
        type={type}
        onClick={onClick}
        disabled={disabled}
        data-testid={testId}
      />
    </div>
  );
};

export default ReservationFooter;

const FixedBtnBoxStyle = css`
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: ${variables.colors.white};
  padding: 1.8rem ${variables.layoutPadding} 3rem;
  border-top: 1px solid ${variables.colors.gray300};
  z-index: 9;

  .totalPrice {
    display: flex;
    flex-direction: column;
    min-width: 10rem;

    & h2 {
      ${TypoCapSmR}
      color:  ${variables.colors.gray600};
      margin-bottom: 0.2rem;
    }

    & h3 {
      ${TypoTitleSmS}
    }
  }
  ${mqMin(breakPoints.pc)} {
    position: sticky;
    bottom: 0;
  }
`;
