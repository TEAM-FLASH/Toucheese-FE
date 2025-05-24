/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import useToast from '@hooks/useToast';
import { useTempStore } from '@store/useTempStore';
import { useUserStore } from '@store/useUserStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { PCLayout, TypoTitleMdSb, TypoTitleXsM, TypoTitleXsSb } from '@styles/Common';
import variables from '@styles/Variables';
import { encryptUserData } from '@utils/encryptUserData';
import { createSafeUserObject } from '@utils/userDataHelper';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
  const AuthRedirectURI = import.meta.env.VITE_AUTH_REDIRECT_EDITPRORILE_URI;

  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const openToast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const setUser = useUserStore((state) => state.setUser);
  const tempUserEmail = useTempStore((state) => state.tempUserEmail);
  const tempUserPhone = useTempStore((state) => state.tempUserPhone);
  const tempUsername = useTempStore((state) => state.tempUsername);

  useEffect(() => {
    if (tempUsername && tempUserPhone) {
      setIsActive(true);
      setIsDisabled(false);
      reset();
    }
  }, []);

  const handleEditProfile = async () => {
    const formValues = getValues();
    const formUserName = formValues.username?.trim();
    const formUserPhone = formValues.phone?.trim();

    const loadLocalStorageData = (key: string) => {
      try {
        return JSON.parse(localStorage.getItem(key) || '');
      } catch (error) {
        console.error('JSON 파싱 오류', error);
        openToast('데이터를 불러오는 데 문제가 발생했습니다.');
        return null;
      }
    };
    const userData = loadLocalStorageData('userState');
    const accessToken = userData.state.accessToken;

    //TODO - tmepUserData == formUserData ? POST : error
    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/user/mypage/changeph`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
          ...(formUserName && { newName: formUserName }),
          ...(formUserPhone && { newPhone: formUserPhone }),
        }),
      });

      if (!response.ok) throw new Error('업데이트 실패');

      // 유저 객체 생성
      const updatedUser = createSafeUserObject({
        username: tempUsername,
        phone: tempUserPhone,
        email: tempUserEmail,
      });
      // Zustand 상태 업데이트
      setUser(updatedUser);
      navigate('/user/profile', {
        state: { showSuccessProfileModal: true },
      });
    } catch (error) {
      console.error('회원정보 수정 오류:', error);
      openToast('알수없는 오류가 발생했습니다.');
    }
  };

  /** 간편 본인인증 실행 함수 */
  const handleAuth = () => {
    // IMP 객체가 없는 경우를 확인
    if (!window.IMP) {
      console.error('본인인증이 실행되지 않았습니다.');
      openToast('본인인증 로드에 실패했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const { IMP } = window;
    IMP.init(IMPCode);
    const setTempData = useTempStore.getState().setTempData;
    const formValues = getValues();
    const userStore = useUserStore.getState();
    const encryptedData = encryptUserData(
      {
        username: formValues.username,
        phone: formValues.phone,
        email: formValues.email,
      },
      {
        encryptedEmail: userStore.encryptedEmail,
        encryptedPhone: userStore.encryptedPhone,
        encryptedUsername: userStore.encryptedUsername,
      },
    );

    // 모바일 환경일 경우에만 localStorage에 저장
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      localStorage.setItem('temp-user-data', JSON.stringify(encryptedData));
    }

    IMP.certification(
      {
        channelKey: channelKey,
        merchant_uid: 'test_m5nmk62j',
        m_redirect_url: AuthRedirectURI,
      },
      async (res: AuthVerificationType) => {
        try {
          if (res.success) {
            const formValues = getValues();

            if (!formValues.username || !formValues.phone) {
              console.warn('유효하지 않은 값이 있습니다:', formValues);
              openToast('이름과 전화번호를 입력해주세요.');
              return;
            }

            setTempData({
              username: formValues.username,
              phone: formValues.phone,
              email: formValues.email,
            });

            // 인증 후 바로 화면 초기화
            setIsActive(true);
            setIsDisabled(false);

            // reset을 비동기적으로 호출
            setTimeout(() => {
              reset({
                username: formValues.username,
                phone: formValues.phone,
                email: formValues.email,
              });
            }, 0); // 화면 리렌더링 후 reset을 비동기적으로 호출
          } else {
            console.warn('본인인증 실패:', res);
            openToast('본인인증에 실패했습니다.');
          }
        } catch (err) {
          console.error('본인인증 오류:', err);
          setIsActive(false);
          setIsDisabled(true);
          openToast('본인인증 중 오류가 발생했습니다.');
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
      <div css={changeProfileWrapper}>
        <div css={MOheaderStyle}>
          <BackButton />
          <h1>개인정보 변경</h1>
        </div>
        <div css={PCheaderStyle}>
          <h1>개인정보 변경</h1>
        </div>

        <h2 css={pageTitleStyle}>개인정보</h2>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(() => {
              handleEditProfile();
            })();
          }}
          css={formStyle}
        >
          <div css={containerStyle}>
            {/* 이름 */}
            <Input
              labelName="이름"
              type="name"
              onChange={(e) => {
                setValue('username', e.target.value);
              }}
              defaultValue={tempUsername ?? ''}
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
                setValue('phone', e.target.value);
              }}
              defaultValue={tempUserPhone ?? ''}
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
              type="submit"
              text="변경하기"
              size="large"
              variant="gray"
              disabled={isDisabled}
              active={isActive}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangeProfile;

const changeProfileWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: ${variables.headerHeight};

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    min-width:  60.8rem;
    max-width: 60.8rem;
    padding: 4rem 1.6rem 0;
    margin: 0 auto 0 31rem;
  }
`;

const MOheaderStyle = css`
  position: relative;
  display: flex;
  height: 5rem;
  align-items: center;

  h1 {
    ${TypoTitleXsM}
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  ${mqMin(breakPoints.pc)} {
    display: none;
  }
`;
const PCheaderStyle = css`
  display: none;

  h1 {
    ${TypoTitleMdSb}
    margin-bottom: 4.2rem;
  }

  ${mqMin(breakPoints.pc)} {
    margin-bottom: 3.2rem;
    display: contents;
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
