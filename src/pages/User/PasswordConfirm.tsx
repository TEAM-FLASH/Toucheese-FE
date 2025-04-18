/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { css } from '@emotion/react';
import useToast from '@hooks/useToast';
import { TypoTitleXsM, TypoTitleXsSb } from '@styles/Common';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const PasswordConfirm = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const openToast = useToast();

  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  useEffect(() => {
    setIsActive(password);
    setIsDisabled(!password);
  }, [password]);

  const loadSessionStorageData = (key: string) => {
    /** key에 해당하는 데이터 호출 */
    const localData = localStorage.getItem(key);
    if (!localData) {
      return null;
    }

    try {
      const parsedData = JSON.parse(localData);
      return parsedData;
    } catch (error) {
      console.error('JSON 파싱 오류', error);
      return null;
    }
  };

  const handleEditUser = async () => {
    const userData = loadSessionStorageData('userState');
    const formData = {
      email: userData?.state.email,
      password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
      navigate('/user/profile/passwordChange');
    } catch (error) {
      console.error('비밀번호 확인 중 오류 발생:', error);
      openToast('비밀번호 확인 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <Helmet>
        <title>{`비밀번호 변경`}</title>
        <meta property="og:title" content="사용자 비밀번호 변경" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="사용자 비밀번호 변경" />
      </Helmet>

      <div css={headerStyle}>
        <BackButton />
        <h1>비밀번호 입력</h1>
      </div>
      <h2 css={pageTitleStyle}>
        정보를 안전하게 보호하기 위해
        <br />
        비밀번호를 다시 한 번 입력해주세요
      </h2>
      <form noValidate css={formStyle}>
        <div css={containerStyle}>
          {/* 비밀번호 */}
          <Input
            labelName="비밀번호"
            type="password"
            placeholder="8자 이상의 비밀번호"
            register={register('password', {
              required: '비밀번호를 입력해주세요',
              validate: (value) => {
                if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/.test(value)) {
                  return '8~20자 영문/숫자 조합으로 입력해주세요.';
                }

                return true;
              },
            })}
            error={errors.password?.message?.toString()}
          />
        </div>

        <div css={buttonStyle}>
          <Button
            onClick={handleEditUser}
            type="submit"
            text="다음"
            width="max"
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

export default PasswordConfirm;

const headerStyle = css`
  display: flex;
  margin-bottom: 2rem;

  h1 {
    ${TypoTitleXsM}
    margin: auto;
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
  left: 0;
  bottom: 3rem;
  width: calc(100% - 3.2rem);
`;

const pageTitleStyle = css`
  ${TypoTitleXsSb}
  padding: 1rem 0;
  display: flex;
  align-items: center;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
`;
