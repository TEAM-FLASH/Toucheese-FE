/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';

const NoResult = ({
  message,
  bg = 'white',
}: {
  message: React.ReactNode;
  bg?: 'white' | 'gray100';
}) => {
  return (
    <div css={DivStyle({ bg })}>
      <p css={TypoTitleXsM}>{message}</p>
    </div>
  );
};

const DivStyle = ({ bg }: { bg: 'white' | 'gray100' }) => css`
  width: 100%;
  display: flex;
  color: ${variables.colors.gray700};
  height: ${bg === 'white' ? 'calc(100vh - 8rem)' : 'calc(100vh - 10rem)'};
  margin-bottom: -9.6rem;
  background-color: ${variables.colors[bg]};

  & p {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
    text-align: center;

    &::before {
      content: '';
      width: 6.5rem;
      height: 6.5rem;
      background: url('/img/icon-noresult.svg') no-repeat center / contain;
    }
  }

  ${mqMin(breakPoints.pc)} {
    height: ${bg === 'white' ? 'calc(100vh - 13.8rem)' : 'calc(100vh - 21.8rem)'};
    margin-bottom: ${bg === 'gray100' && 'calc(-1 * 12rem)'};

    & p {
      &::before {
        width: 10rem;
        height: 10rem;
      }
    }
  }
`;

export default NoResult;
