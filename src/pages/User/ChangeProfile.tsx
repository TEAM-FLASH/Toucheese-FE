/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import useToast from '@hooks/useToast';
import useSignupStore from '@store/useSignupStore';
import { TypoTitleXsM, TypoTitleXsSb } from '@styles/Common';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

interface AuthVerificationType {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  pg_provider: 'inicis_unified';
  pg_type: 'certification';
  error_code: string;
  error_msg: string;
}

const ChangeProfile = () => {
  const IMPCode = import.meta.env.VITE_AUTH_IMP_CODE;
  const channelKey = import.meta.env.VITE_AUTH_CHANNEL_KEY;
  const AuthRedirectURI = import.meta.env.VITE_AUTH_EDIT_REDIRECT_URI;

  /** zustand 스토어에 데이터 저장 */
  const { setSignupData } = useSignupStore();
  const [searchParams] = useSearchParams();
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const storedData = localStorage.getItem('userState');
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const storageName = parsedData?.state?.username || '';
  const storagePhone = parsedData?.state?.phone || '';

  const [username] = useState('');
  const [phone] = useState('');
  const openToast = useToast();

  const handleEditProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/user/mypage/changeph`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, phone }),
      });
      if (!response.ok) throw new Error('업데이트 실패');
      openToast('회원 정보 수정이 완료 되었습니다.');
    } catch (error) {
      console.error('회원정보 수정 오류:', error);
      openToast('알수없는 오류가 발생했습니다.');
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
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
  /** 본인인증 페이지 이동 */
  const usernameRef = useRef(storageName);
  const phoneRef = useRef(storagePhone);

  // 페이지가 처음 로드될 때 zustand 상태를 react-hook-form에 반영
  useLayoutEffect(() => {
    if (searchParams.get('success')) {
      setIsActive(true);
      setIsDisabled(false);
      setSignupData({ username: storageName, phone: storagePhone });
      reset();
    }
  }, [searchParams, storageName, storagePhone, setSignupData]);

  useEffect(() => {
    if (storageName && storagePhone) {
      // form에 값 설정
      setValue('username', storageName);
      setValue('phone', storagePhone);
    }
  }, [storageName, storagePhone, setValue]);

  const handleSave = (data: any) => {
    // 기존 localStorage 데이터 가져오기
    const storedData = localStorage.getItem('userState');
    const parsedData = storedData ? JSON.parse(storedData) : {};

    // 기존 데이터와 변경된 유저 정보 병합
    const updatedData = {
      ...parsedData, // 기존 데이터 유지
      state: {
        ...parsedData.state, // 기존 state 유지
        username: data.username,
        phone: data.phone,
      },
    };

    // 새로운 데이터 저장
    localStorage.setItem('userState', JSON.stringify(updatedData));
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
        <title>{`개인정보 변경`}</title>
        <meta property="og:title" content="사용자 개인정보 변경" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="사용자 개인정보 변경" />
      </Helmet>

      <div css={headerStyle}>
        <BackButton />
        <h1>개인정보 변경</h1>
      </div>
      <h2 css={pageTitleStyle}>개인정보</h2>
      <form noValidate onSubmit={handleSubmit(handleSave)} css={formStyle}>
        <div css={containerStyle}>
          {/* 이름 */}
          <Input
            labelName="이름"
            type="name"
            onChange={(e) => {
              usernameRef.current = e.target.value;
              setSignupData({ username: e.target.value });
              setValue('username', e.target.value);
            }}
            defaultValue={storageName}
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
            type="phone"
            labelName="휴대폰"
            onChange={(e) => {
              phoneRef.current = e.target.value;
              setSignupData({ phone: e.target.value });
              setValue('phone', e.target.value);
            }}
            defaultValue={storagePhone}
            placeholder="‘-’구분없이 입력하세요"
            hasCheckButton
            onCheck={handleAuth}
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
            onClick={handleEditProfile}
            type="submit"
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

export default ChangeProfile;

const headerStyle = css`
  display: flex;
  margin-bottom: 2rem;

  h1 {
    ${TypoTitleXsM}
    margin-left: 0.8rem;
  }
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1.2rem;
`;

const buttonStyle = css`
  position: fixed;
  bottom: 3rem;
  left: 1.6rem;
  width: calc(100% - 3.2rem);
`;

const pageTitleStyle = css`
  ${TypoTitleXsSb}
  height: 5rem;
  display: flex;
  align-items: center;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;
