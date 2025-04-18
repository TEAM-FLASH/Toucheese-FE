/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import { TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useToast from '@hooks/useToast';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, PCLayout } from '@styles/Common';
import { createEmailRegex, createPasswordRegex } from 'wj-password-validator';
import useLoginMutation from '@hooks/useLoginMutation';

interface loginType {
  email: string;
  password: string;
}

const LoginWithEmailPage = () => {
  const navigate = useNavigate();
  const openToast = useToast();
  const { mutate: loginMutate } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();

  const emailPattern = createEmailRegex();
  // validation 설정 부분
  const passwordPattern = createPasswordRegex({
    minLength: 8,
    // uppercase: true,
    lowercase: true,
    digits: true,
    specialChar: true,
  });

  const handleLogin = (data: loginType) => {
    loginMutate(data, {
      onSuccess: () => {
        openToast('로그인 성공!');
        navigate('/');
      },
      onError: () => {
        openToast('로그인에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>이메일로 로그인 - 터치즈</title>
        <meta
          name="description"
          content="터치즈에서 이메일로 로그인하세요. 내 인생 사진관을 찾고 예약까지 한 번에!"
        />
        <meta property="og:title" content="이메일로 로그인 - 터치즈" />
        <meta
          property="og:description"
          content="터치즈에서 이메일로 로그인하세요. 내 인생 사진관을 찾고 예약까지 한 번에!"
        />
      </Helmet>

      <div css={AuthContainerStyle}>
        {/* PC 레이아웃일 때만 보이는 왼쪽 이미지 영역 */}
        <div css={LeftImageStyle}>
          <img src="/img/img-pc_AuthPage.svg" alt="터치즈 소개 이미지" />
        </div>

        {/* 오른쪽 컨텐츠 영역 */}
        <div css={RightContentStyle}>
          <div css={HeaderWrapperStyle}>
            <Header title="이메일로 로그인" />
          </div>

          <div css={LoginPageDesStyle}>
            <h1>터치즈에서 간편하게</h1>
            <p>내 인생 사진관 찾고 예약까지!</p>
          </div>

          <form noValidate onSubmit={handleSubmit(handleLogin)} css={FormStyle}>
            <Input
              labelName="이메일(아이디)"
              type="email"
              placeholder="toucheese@gmail.com"
              register={register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: new RegExp(emailPattern),
                  message: '올바른 이메일 주소를 입력해주세요.',
                },
              })}
              error={errors.email?.message?.toString()}
            />
            <Input
              labelName="비밀번호"
              type="password"
              placeholder="8자 이상의 비밀번호"
              register={register('password', {
                required: '비밀번호를 입력해주세요',
                pattern: {
                  value: new RegExp(passwordPattern),
                  message: '비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다',
                },
              })}
              error={errors.password?.message?.toString()}
            />

            <button
              type="submit"
              css={css`
                width: 100%;
                background-color: ${variables.colors.gray900};
                color: ${variables.colors.white};
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0.8rem;
                margin-top: 4.8rem;
                height: 4.8rem;
                padding: 12 0px;
              `}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const AuthContainerStyle = css`
  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    ${bg100vw(variables.colors.white)}
    display: flex;
    min-height: 100vh;
  }
`;

const LeftImageStyle = css`
  display: none;

  ${mqMin(breakPoints.pc)} {
    display: block;
    width: 50%;
    height: 100vh;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const RightContentStyle = css`
  width: 100%;
  padding: 0 2rem;

  ${mqMin(breakPoints.pc)} {
    width: 50%;
    padding: 0 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${variables.colors.white};
  }
`;

const HeaderWrapperStyle = css`
  margin-bottom: 4rem;

  ${mqMin(breakPoints.pc)} {
    margin-bottom: 8rem;
    display: none;
  }
`;

const LoginPageDesStyle = css`
  h1 {
    ${TypoTitleSmS}
  }
  p {
    font-size: 1.8rem;
  }
  margin-bottom: 3.4rem;

  ${mqMin(breakPoints.pc)} {
    display: none;
  }
`;

const FormStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${mqMin(breakPoints.pc)} {
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
  }
`;

export default LoginWithEmailPage;
