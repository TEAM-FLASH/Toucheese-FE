/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { defaultUserState } from '@store/useUserStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Hidden } from '@styles/Common';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'types/types';

const UserButton = () => {
  const navigate = useNavigate();

  // user 정보 로컬스토리지에서 가져오기
  const { accessToken: user } = getLocalStorageItem<IUser>('userState', defaultUserState);

  return (
    <ButtonStyle
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/user/${user ? 'mypage' : 'auth'}`);
      }}
    >
      <span css={Hidden}>{user ? '마이페이지' : '로그인'}</span>
      <img src="/img/icon-user-black.svg" alt={user ? '마이페이지' : '로그인'} />
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  width: 4rem;
  height: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 1.6rem;
    height: 1.6rem;
  }

  ${mqMin(breakPoints.pc)} {
    width: 6rem;
    height: 6rem;

    & > img {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
`;

export default UserButton;
