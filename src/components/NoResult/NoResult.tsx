/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';

const NoResult = ({ message }: { message: string }) => {
  return (
    <DivStyle>
      <p css={TypoTitleXsM}>{message}</p>
    </DivStyle>
  );
};

const DivStyle = styled.div`
  display: flex;
  color: ${variables.colors.gray700};
  min-height: 60vh;

  & p {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    &::before {
      content: '';
      width: 6.5rem;
      height: 6.5rem;
      background: url('/img/icon-noresult.svg') no-repeat center / contain;
    }
  }
`;

export default NoResult;
