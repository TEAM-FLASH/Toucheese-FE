/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import useToast from '@hooks/useToast';
import { loadUserFromStorage, useUserStore } from '@store/useUserStore';
import { TypoBodyMdR, TypoTitleXsB, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Profile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const openToast = useToast();
  const hasShownToastRef = useRef(false);
  const logout = useUserStore((state) => state.resetUser);
  const { email, phone, username, registration } = useUserStore();

  // 암호화 된 유저 정보 복호화
  useEffect(() => {
    loadUserFromStorage();
  }, []);

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

  useEffect(() => {
    if (searchParams.get('success') === 'true' && !hasShownToastRef.current) {
      openToast('개인정보 변경에 성공했습니다.');
      hasShownToastRef.current = true;
    }
  }, [searchParams]);

  return (
    <>
      <div css={headerStyle}>
        <BackButton />
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
              border-bottom: 0.1rem solid ${variables.colors.gray300};
              margin: 0.4rem;
            `}
          />

          <dl css={infoDataBoxStyle}>
            <div>
              <dt>이름</dt>
              <dd>{username || '이름 없음'}</dd>
            </div>
            <div>
              <dt>휴대폰 번호</dt>
              <dd>{phone || '연락처 없음'}</dd>
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
              border-bottom: 0.1rem solid ${variables.colors.gray300};
              margin: 0.4rem;
            `}
          />

          <dl css={infoDataBoxStyle}>
            <div>
              <dt>아이디(이메일)</dt>
              <dd>{email || '이메일(아이디) 없음'}</dd>
            </div>
            <div>
              <dt>로그인 방식</dt>
              <dd>{registration === 'EMAIL' ? 'Email' : registration}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div css={accoutStyle}>
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
        <li>|</li>
        <button type="button">회원 탈퇴</button>
      </div>
    </>
  );
};

const headerStyle = css`
  display: flex;
  margin-bottom: 2rem;

  h1 {
    ${TypoTitleXsM}
    margin-left: 0.8rem;
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
  display: flex;
  gap: 1rem;
  justify-content: center;
  text-align: center;
  ${TypoBodyMdR}
  color: ${variables.colors.gray600};
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
`;

// const ButtonStyle = css`
//   padding: 0 4.6rem;
//   margin: auto;
//   margin-top: 2.8rem;
// `;

export default Profile;
