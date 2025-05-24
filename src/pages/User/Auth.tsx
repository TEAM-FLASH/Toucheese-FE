/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, PCLayout } from '@styles/Common';
import variables from '@styles/Variables';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import LoginTypeButton from './components/LoginTypeButton';

const Auth = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    // 카카오 공식 OAuth 엔드포인트 사용
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  const handleGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
  };

  return (
    <>
      <Helmet>
        <title>터치즈 - 로그인/회원가입</title>
        <meta name="description" content="터치즈에서 간편하게 내 인생 사진관을 찾고 예약하세요!" />
        <meta property="og:title" content="터치즈 - 로그인/회원가입" />
        <meta
          property="og:description"
          content="터치즈에서 간편하게 내 인생 사진관을 찾고 예약하세요!"
        />
      </Helmet>

      <div css={AuthContainerStyle}>
        {/* PC 레이아웃일 때만 보이는 왼쪽 이미지 영역 */}
        <div css={LeftImageStyle}></div>

        {/* 오른쪽 컨텐츠 영역 */}
        <div css={RightContentStyle}>
          <div css={HeaderWrapperStyle}>
            <Header title="로그인/회원가입" />
          </div>

          <div css={LoginPageDesStyle}>
            <h2>터치즈에서 간편하게</h2>
            <p>내 인생 사진관 찾고 예약까지!</p>
          </div>

          <div css={LoginTypeButtonWrapper}>
            <LoginTypeButton type="kakao" onClick={handleKakaoLogin} />
            <LoginTypeButton type="google" onClick={handleGoogleLogin} />
            <LoginTypeButton type="email" onClick={() => navigate('/user/AuthVerification')} />
          </div>

          <Link to="/login">
            <div css={LoginLinkStyle}>
              <span
                css={css`
                  color: ${variables.colors.gray700};
                  margin-right: 0.4rem;
                `}
              >
                이미 가입하셨나요?
              </span>
              <h3
                css={css`
                  color: ${variables.colors.black};
                `}
              >
                로그인 하기
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Auth;

export const AuthContainerStyle = css`
  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    // ${bg100vw(variables.colors.white)}
    margin-bottom: -3rem;
    display: flex;
    gap: 1.6rem;
    height: calc(100vh - ${variables.headerHeight});
  }
`;

export const LeftImageStyle = css`
  display: none;

  ${mqMin(breakPoints.pc)} {
    display: block;
    width: 70%;
    height: 100vh;
    position: relative;
    transform: translateX(-8rem);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ${mqMin(breakPoints.pc)} {
    display: unset;
    width: 70%;
    flex-grow: 1;
    margin-left: calc(-1 * ${variables.layoutPadding});
    background-color: ${variables.colors.primary50};
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: '';
      display: block;
      width: 42.4rem;
      height: 32.8rem;
      margin-left: 2.5rem;
      margin-top: 3.5px;
      background: url('/img/img-auth.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }
`;

export const RightContentStyle = css`
  width: 100%;
  padding: 0 2rem;

  ${mqMin(breakPoints.pc)} {
    flex-grow: 1;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${variables.colors.white};
  }
`;

const HeaderWrapperStyle = css`
  margin-bottom: 5.3rem;

  ${mqMin(breakPoints.pc)} {
    margin-bottom: 8rem;
    display: none;
  }
`;

const LoginPageDesStyle = css`
  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    opacity: 0;
    animation: fadeIn 0.5s ease-in forwards;
  }
  p {
    font-size: 2.2rem;
    opacity: 0;
    animation: fadeIn 0.5s ease-in forwards;
    animation-delay: 0.5s;
  }
  margin-bottom: 10.2rem;

  ${mqMin(breakPoints.pc)} {
    display: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const LoginTypeButtonWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 40%;

  ${mqMin(breakPoints.pc)} {
    gap: 2rem;
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
  }
`;

const LoginLinkStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 6rem;
  left: 0;
  right: 0;

  ${mqMin(breakPoints.pc)} {
    position: static;
    margin-top: 4rem;
  }
`;
