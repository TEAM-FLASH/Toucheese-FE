/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Hidden } from '@styles/Common';
import { Link } from 'react-router-dom';

const PCHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="pc" css={HeaderStyle}>
      <Link
        css={css`
          margin: 1.2rem 0;
          flex-shrink: 0;

          & > img {
            width: 13.7rem;
            height: 3.6rem;
          }
        `}
        to="/"
      >
        <span css={Hidden}>홈으로</span>
        <img src="/img/logo-pc.svg" alt="터치즈 홈" />
      </Link>

      {children}
    </header>
  );
};

export default PCHeader;

const HeaderStyle = css`
  ${mqMin(breakPoints.pc)} {
    display: flex;
    align-items: center;
    padding: 1rem 0;
  }
`;
