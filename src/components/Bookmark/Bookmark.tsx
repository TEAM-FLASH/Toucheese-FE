/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import useBookmark from '@hooks/useBookmark';
import useToast from '@hooks/useToast';
import { defaultUserState } from '@store/useUserStore';
import { Hidden, TypoCapXsR } from '@styles/Common';
import variables from '@styles/Variables';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from 'types/types';

interface IBookmarkState {
  isActive: boolean;
  count: number;
}

const Bookmark = ({
  id,
  count: initialCount,
  isBookmarked: initialBookmark,
}: {
  id: number;
  count: number;
  isBookmarked: boolean;
}) => {
  const [bookmark, setBookmark] = useState<IBookmarkState>({
    isActive: initialBookmark,
    count: initialCount,
  });
  const handleBookmark = useBookmark(bookmark.isActive);
  const userState = getLocalStorageItem<IUser>('userState', defaultUserState);
  const openToast = useToast();
  const navigate = useNavigate();

  // 북마크 설정/해제 api 호출
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (userState.accessToken && userState.user_id) {
      await handleBookmark(userState.user_id, userState.accessToken, id);
      setBookmark((state) => ({
        ...state,
        isActive: !state.isActive,
        count: state.isActive ? state.count - 1 : state.count + 1,
      }));
    }
    // 로그인 되지 않은 상태면 로그인 페이지로 이동
    else {
      openToast('좋아요를 누르시려면 로그인이 필요합니다!');
      navigate('/user/auth');
    }
  };

  return (
    <BookmarkStyle>
      <button type="button" onClick={handleClick}>
        <img
          src={`/img/icon-bookmark-${bookmark.isActive ? 'active' : 'inactive'}.svg`}
          alt={`북마크 ${bookmark.isActive ? '해제' : '등록'}`}
        />
        <span css={Hidden}>북마크 {`${bookmark.isActive ? '해제' : '등록'}하기`}</span>
      </button>
      <p css={TypoCapXsR}>{bookmark.count}</p>
    </BookmarkStyle>
  );
};

export default Bookmark;

const BookmarkStyle = styled.div`
  & > button {
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      width: 2rem;
      height: 1.8rem;
    }
  }

  & > p {
    color: ${variables.colors.gray600};
    margin: 0 auto;
    text-align: center;
  }
`;
