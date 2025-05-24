/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import Header from '@components/Header/Header';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import useSignupStore from '@store/useSignupStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Hidden, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ISocialData } from 'types/types';

interface AuthVerificationType {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  pg_provider: 'inicis_unified';
  pg_type: 'certification';
  error_code: string;
  error_msg: string;
}

const IMPCode = import.meta.env.VITE_AUTH_IMP_CODE;
const channelKey = import.meta.env.VITE_AUTH_CHANNEL_KEY;
const AuthRedirectURI = import.meta.env.VITE_AUTH_REDIRECT_URI;

const AuthVerification = () => {
  /** zustand 스토어에 데이터 저장 */
  const { setSignupData } = useSignupStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const storedData = sessionStorage.getItem('signup-storage');
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const storageName = parsedData?.state?.username || '';
  const storagePhone = parsedData?.state?.phone || '';

  // 소셜 로그인 데이터
  const location = useLocation();
  const socialData: ISocialData = location.state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // form 초기값을 sessionStorage 데이터로 설정
    defaultValues: {
      username: storageName,
      phone: storagePhone,
    },
  });

  /** 페이지가 처음 로드될 때 zustand 상태를 react-hook-form에 반영 */
  /** 모바일 - 본인인증 페이지 이동 */
  useLayoutEffect(() => {
    if (searchParams.get('success')) {
      setIsActive(true);
      setIsDisabled(false);
      setSignupData({ username: storageName, phone: storagePhone });
      reset();
    }
  }, []);

  const handleSave = async (data: any) => {
    if (!isVerified) {
      return;
    }

    if (!socialData) {
      // 이메일 회원가입인 경우 인증 후 가입 페이지로 이동
      setSignupData(data);
      navigate('/user/signup');
    } else {
      // 소셜 회원가입인 경우 인증 후 회원가입 api 호출!
      const formData = {
        userName: storageName,
        email: socialData.r_email,
        password: socialData.r_password,
        phone: storagePhone,
        registration: socialData.r_registration,
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status}`);
        }

        if (response.ok) {
          navigate('/user/signupSuccess');
        }
      } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
      }
    }
  };

  /** 간편 본인인증 실행 함수 */
  const handleAuth = () => {
    const { IMP } = window;
    IMP.init(IMPCode);

    IMP.certification(
      {
        channelKey: channelKey,
        merchant_uid: 'test_m5nmk62j',
        m_redirect_url: AuthRedirectURI,
      },
      async (res: AuthVerificationType) => {
        try {
          /** PC - 본인인증 팝업 */
          if (res.success) {
            // 상태 업데이트가 이루어진 후 비동기적으로 reset 호출
            setIsActive(true);
            setIsDisabled(false);
            setSignupData({ username: storageName, phone: storagePhone });
            setIsVerified(true);

            // 비동기적으로 reset 호출 (setState 후 화면이 렌더링된 후 reset)
            setTimeout(() => {
              reset({
                username: storageName,
                phone: storagePhone,
              });
            }, 0); // setState 후 화면 리렌더링을 보장하기 위해 0ms 후 실행
          }
        } catch (err) {
          console.error(err);
          setIsActive(false);
          setIsDisabled(true);
        }
      },
    );
  };

  return (
    <>
      <Helmet>
        <title>{`회원가입 - 본인인증`}</title>
        <meta property="og:title" content="사용자 본인인증" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="사용자 본인인증" />
      </Helmet>

      <Header title="터치즈 회원 가입" />
      <h2 css={Hidden}>본인인증</h2>
      <h3 css={pageTitleStyle}>
        이름과 휴대폰 번호를 <br />
        알려주세요
      </h3>
      <form noValidate onSubmit={handleSubmit(handleSave)} css={formStyle}>
        <div css={containerStyle}>
          {/* 이름 */}
          <Input
            labelName="이름"
            type="name"
            onChange={(e) => {
              setSignupData({ username: e.target.value });
            }}
            placeholder="실명을 입력하세요."
            register={register('username', {
              required: '이름은 필수입니다',
              minLength: {
                value: 2,
                message: '이름은 2자 이상이어야 합니다',
              },
            })}
            error={errors.username?.message?.toString()}
          />

          {/* 휴대폰 번호 */}
          <Input
            labelName="휴대폰 번호"
            type="phone"
            onChange={(e) => {
              setSignupData({ phone: e.target.value });
            }}
            placeholder="‘-’구분없이 입력하세요"
            onCheck={handleAuth}
            hasCheckButton
            checkButtonText="인증하기"
            register={register('phone', {
              required: '휴대폰 번호는 필수입니다.',
              minLength: {
                value: 11,
                message: '올바른 휴대폰 번호 형식이 아닙니다.',
              },
            })}
            error={errors.phone?.message?.toString()}
          />
        </div>

        <div css={buttonStyle}>
          <Button
            type="submit"
            width="max"
            text="다음"
            size="large"
            variant="gray"
            disabled={isDisabled}
            active={isActive}
          />
        </div>
      </form>
    </>
  );
};

export default AuthVerification;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const buttonStyle = css`
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 ${variables.layoutPadding};

  ${mqMin(breakPoints.pc)} {
    left: calc(max((100vw - 1280px) / 2, 0px) + 32rem);
    transform: none;
    width: auto;

    & > button {
      min-width: 60rem;
      max-width: 60rem;
      width: 100%;
    }
  }
`;
const pageTitleStyle = css`
  ${TypoTitleMdSb}
  margin: 2.6rem 0 3rem 0;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;
