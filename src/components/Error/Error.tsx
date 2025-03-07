/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import { TypoTitleMdSb, TypoTitleXsR } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  if (error) console.error(error);

  let navigate;
  try {
    navigate = useNavigate();
  } catch {
    navigate = null;
  }

  return (
    <>
      <section css={errorWr}>
        <div css={titleBox}>
          <h1 css={TypoTitleMdSb}>문제가 발생했어요!</h1>
          <p css={TypoTitleXsR}>
            앗, 플래시가 너무 강했나요? <br />
            최대한 빨리 해결할게요. <br />
            그동안 다시 초점을 맞춰볼까요?
          </p>
        </div>

        {navigate && (
          <div css={btnBox}>
            <Button text="이전으로" variant="gray" onClick={() => navigate(-1)} />
            <Button text="홈으로" variant="black" onClick={() => navigate('/')} />
          </div>
        )}
      </section>
    </>
  );
};

export default Error;

const errorWr = css`
  position: absolute;
  inset: 0;
  padding: 0 ${variables.layoutPadding};
  text-align: center;
  display: flex;
  flex-direction: column;

  h1 {
    padding-top: 12rem;
    background: url(/img/icon-404.svg) no-repeat center top / 15.6rem;
  }
  p {
    margin-top: 2rem;
    color: ${variables.colors.gray700};
    opacity: 0.7;
  }
`;

const titleBox = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const btnBox = css`
  padding: 1.8rem ${variables.layoutPadding} 3rem;
  display: flex;
  gap: 0.8rem;
  background: #fff;
`;
