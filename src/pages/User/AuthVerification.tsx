/** @jsxImportSource @emotion/react */

import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import useSignupStore from '@store/useSignupStore';
import { TypoTitleMdSb } from '@styles/Common';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const IMPCode = import.meta.env.VITE_AUTH_IMP_CODE;
const channelKey = import.meta.env.VITE_AUTH_CHANNEL_KEY;

const AuthVerification = () => {
  /** zustand 스토어에 데이터 저장 */
  const { setSignupData, phone, name } = useSignupStore();
  const navigate = useNavigate();

  const handleSave = (data: any) => {
    setSignupData(data);
    console.log('데이터 저장완료', phone, name);
    console.log('현재상태', useSignupStore.getState());
    // window.location.href = '/user/signup';
  };

  /** 간편 본인인증 실행 함수 */
  const handleAuth = () => {
    const { IMP } = window;
    IMP.init(IMPCode);

    IMP.certification(
      {
        channelKey: channelKey,
        merchant_uid: 'test_m5nmk62j',
        m_redirect_url: 'http://localhost:5173/user/AuthVerification',
      },
      async (res: {
        success: boolean;
        imp_uid: string;
        merchant_uid: string;
        pg_provider: 'inicis_unified';
        pg_type: 'certification';
        error_code: string;
        error_msg: string;
      }) => {
        try {
          if (res.success) {
            console.log(res);
          }
        } catch (err) {
          console.error(err);
        }
      },
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  /** 페이지가 처음 로드될 때 zustand 상태를 react-hook-form에 반영 */
  useEffect(() => {
    setValue('phone', phone);
    setValue('name', name);
    console.log('useEffect = > Current phone, name:', phone, name);
  }, [phone, name, setValue]);

  return (
    <>
      <BackButton />
      <h2 css={pageTitleStyle}>회원가입</h2>
      <form noValidate onSubmit={handleSubmit(handleSave)} css={formStyle}>
        <div css={containerStyle}>
          {/* 이름 */}
          <Input
            labelName="이름"
            type="name"
            value={name}
            onChange={(e) => {
              console.log('이름 변경:', e.target.value);
              setSignupData({ name: e.target.value });
              register('email').onChange(e);
            }}
            placeholder="실명을 입력하세요."
            register={register('name', {
              required: '이름은 필수입니다',
              minLength: {
                value: 2,
                message: '이름은 2자 이상이어야 합니다',
              },
            })}
            error={errors.name?.message?.toString()}
          />

          {/* 휴대폰 번호 */}
          <Input
            labelName="휴대폰 번호"
            type="phone"
            value={phone}
            onChange={(e) => {
              console.log('폰번호 변경:', e.target.value);
              setSignupData({ phone: e.target.value });
              register('email').onChange(e);
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
            onClick={() => navigate('/user/signup')}
            type="submit"
            text="다음"
            size="large"
            variant="deepGray"
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
  width: calc(100% - 3.2rem);
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
