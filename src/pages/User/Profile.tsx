/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import useModal from '@hooks/useModal';
import { useUserStore } from '@store/useUserStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { PCLayout, TypoBodyMdR, TypoTitleMdSb, TypoTitleXsB, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PasswordChangeSuccessModal from './components/PasswordChangeSuccessModal';
import UserProfileChangeSuccessModal from './components/userDataChangeSuccessModal';
import { decryptUserData } from '@utils/encryptUserData';

const Profile = () => {
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.resetUser);
  const { registration, encryptedEmail, encryptedPhone, encryptedUsername } = useUserStore();
  const passwordModal = useModal(5);
  const profileModal = useModal(6);
  const location = useLocation();

  // 암호화 된 유저 정보 복호화
  const [decryptedUser, setDecryptedUser] = useState({
    email: '',
    phone: '',
    username: '',
  });

  // 유저 정보를 복호화하는 함수
  const decryptUserInfo = () => {
    try {
      // Zustand store에서 직접 암호화된 값을 가져옴
      const currentState = useUserStore.getState();
      const { encryptedEmail, encryptedPhone, encryptedUsername } = currentState;

      if (encryptedEmail || encryptedPhone || encryptedUsername) {
        const decrypted = decryptUserData({
          encryptedEmail,
          encryptedPhone,
          encryptedUsername,
        });

        setDecryptedUser(decrypted);
      }
    } catch (error) {
      console.error('복호화 중 오류 발생:', error);
    }
  };

  // 초기 마운트, location, encryptedEmail, encryptedPhone, encryptedUsername 변경 시 복호화 실행
  useEffect(() => {
    decryptUserInfo();
  }, [location.key, encryptedEmail, encryptedPhone, encryptedUsername]);

  // 모달 상태에 따른 처리
  useEffect(() => {
    if (location.state?.showSuccessModal) {
      passwordModal.open();
    } else if (location.state?.showSuccessProfileModal) {
      profileModal.open();
      // 프로필 변경 성공 시 데이터 다시 복호화
      decryptUserInfo();
    }
  }, [location.state]);

  const handleProfileEditPage = () => {
    navigate('/user/profile/edit');
  };

  const handlePasswordEditPage = () => {
    navigate('/user/profile/passwordConfirm');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* 비밀번호 변경 모달 */}
      <PasswordChangeSuccessModal />
      {/* 유저 정보 변경 모달 */}
      <UserProfileChangeSuccessModal />

      <div css={profileWrapper}>
        <div
          css={css`
            flex: 1;
          `}
        >
          <div css={MOheaderStyle}>
            <BackButton />
            <h1>내정보 관리</h1>
          </div>
          <div css={PCheaderStyle}>
            <h1>내정보 관리</h1>
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 4rem;
            `}
          >
            {/* 개인정보 */}
            <div>
              <div css={infoTitleStyle}>
                <p>개인정보</p>
                <Button
                  text="변경하기"
                  size="small"
                  width="fit"
                  variant="white"
                  onClick={handleProfileEditPage}
                  type="button"
                />
              </div>

              <hr
                css={css`
                  border: none;
                  border-bottom: 1px solid ${variables.colors.gray300};
                  margin: 0.4rem;
                `}
              />

              <dl css={infoDataBoxStyle}>
                <div>
                  <dt>이름</dt>
                  <dd>{decryptedUser.username || '이름 없음'}</dd>
                </div>
                <div>
                  <dt>휴대폰 번호</dt>
                  <dd>{decryptedUser.phone || '연락처 없음'}</dd>
                </div>
              </dl>
            </div>

            <div>
              <div css={infoTitleStyle}>
                <p>계정정보</p>
                {/* 이메일 회원에게만 버튼 노출 */}

                {registration === 'EMAIL' ? (
                  <Button
                    type="button"
                    text="비밀번호 변경하기"
                    size="small"
                    width="fit"
                    variant="white"
                    onClick={handlePasswordEditPage}
                  />
                ) : (
                  ''
                )}
              </div>

              <hr
                css={css`
                  border: none;
                  border-bottom: 1px solid ${variables.colors.gray300};
                  margin: 0.4rem;
                `}
              />

              <dl css={infoDataBoxStyle}>
                <div>
                  <dt>아이디(이메일)</dt>
                  <dd>{decryptedUser.email || '이메일(아이디) 없음'}</dd>
                </div>
                <div>
                  <dt>로그인 방식</dt>
                  <dd>{registration === 'EMAIL' ? 'Email' : registration}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div css={accoutStyle}>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
          <li>|</li>
          <button type="button">회원 탈퇴</button>
        </div>
      </div>
    </>
  );
};

const profileWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: ${variables.headerHeight};
  min-height: 90vh;

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    min-width:  60.8rem;
    max-width: 60.8rem;
    padding: 4rem 1.6rem 0;
    margin: 0 auto 0 31rem;
  }
`;

const MOheaderStyle = css`
  display: flex;
  margin-bottom: 2rem;

  h1 {
    ${TypoTitleXsM}
    margin-left: 0.8rem;
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

const infoTitleStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;

  p {
    ${TypoTitleXsB}
  }
`;

const infoDataBoxStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding: 1rem 0;

  div {
    display: flex;
    justify-content: space-between;
    ${TypoBodyMdR}

    dt {
      color: ${variables.colors.gray800};
    }
  }
`;

const accoutStyle = css`
  margin-top: auto;
  margin-bottom: 6rem;

  display: flex;
  gap: 1rem;
  justify-content: center;
  text-align: center;

  ${TypoBodyMdR}
  color: ${variables.colors.gray600};
`;

export default Profile;
