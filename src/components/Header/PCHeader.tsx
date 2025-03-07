/** @jsxImportSource @emotion/react */

import UserButton from '@components/UserButton/UserButton';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Hidden, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { Link } from 'react-router-dom';

const PCHeader = () => {
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

      <div
        css={css`
          flex-grow: 1;
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            margin: 0.6rem auto;
            position: relative;
            width: 60rem;

            &::before {
              content: '';
              display: inline-block;
              width: 3.6rem;
              height: 3.6rem;
              position: absolute;
              left: 1.6rem;
              top: 50%;
              transform: translateY(-50%);
              z-index: 9;
              background: url('/img/icon-search.svg') no-repeat center / 2.6rem 2.6rem;
            }
          `}
        >
          <InputStyle
            className="search-pc"
            type="text"
            value={''}
            onChange={() => {}}
            onKeyUp={() => {}}
          />

          {/* 모두 지우기 버튼 활성화 조건 */}
          {true && (
            <button
              onClick={() => {}}
              css={css`
                width: 2rem;
                height: 2rem;
                position: absolute;
                right: 1.6rem;
                top: 50%;
                transform: translateY(-50%);
              `}
            >
              <img
                src="/img/icon-cancel.svg"
                alt="모두지우기버튼"
                css={css`
                  display: block;
                  margin: auto;
                  width: 1.7rem;
                  height: 1.7rem;
                `}
              />
            </button>
          )}
        </div>
      </div>
      <div
        css={css`
          flex-shrink: 0;
          margin-left: auto;
        `}
      >
        <UserButton />
      </div>
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

const InputStyle = styled.input`
  &.search-pc {
    all: unset;
    width: 60rem;
    background-color: ${variables.colors.gray200};
    padding: 1.1rem 4.6rem 1.1rem 6.2rem;
    box-sizing: border-box;
    ${TypoTitleXsM}
    color: ${variables.colors.black};
    border-radius: 1rem;
    position: relative;
  }
`;
