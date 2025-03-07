/** @jsxImportSource @emotion/react */
import BackButton from '@components/BackButton/BackButton';
import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import { TypoBodyMdR, TypoTitleXsB, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const data = localStorage.getItem('userState');

  const navigate = useNavigate();

  const handleProfileEditPage = () => {
    navigate('/user/profile/edit');
  };

  const handlePasswordEditPage = () => {
    navigate('/user/profile/passwordConfirm');
  };

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
              <dd>{data ? JSON.parse(data).state.username : '이름 없음'}</dd>
            </div>
            <div>
              <dt>휴대폰 번호</dt>
              <dd>{data ? JSON.parse(data).state.phone : '연락처 없음'}</dd>
            </div>
          </dl>
        </div>

        <div>
          <div css={infoTitleStyle}>
            <p>계정정보</p>
            {/* 이메일 회원에게만 버튼 노출 */}

            {data && JSON.parse(data).state.registration === 'EMAIL' ? (
              <Button
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
              <dd>{data ? JSON.parse(data).state.email : '이메일(아이디) 없음'}</dd>
            </div>
            <div>
              <dt>로그인 방식</dt>
              <dd>
                {data && JSON.parse(data).state.registration === 'EMAIL'
                  ? 'Email'
                  : data && `${JSON.parse(data).state.registration}`}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <button css={accoutStyle} type="button">
        회원 탈퇴
      </button>
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
  ${TypoBodyMdR}
  color: ${variables.colors.gray600};
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
`;

export default Profile;
