/** @jsxImportSource @emotion/react */
import EmptyMessage from '@components/Message/EmptyMessage';
import { css } from '@emotion/react';
import { TypoBodyMdR, TypoCapSmM, TypoTitleXsSB } from '@styles/Common';
import variables from '@styles/Variables';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    setRecentSearches(savedSearches ? JSON.parse(savedSearches) : []);
  }, []);

  const removeSearchTerm = (indexToRemove: number) => {
    const updatedSearches = recentSearches.filter((_, index) => index !== indexToRemove);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const clearAllSearchTerms = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleClickSearchItem = (term: string) => {
    navigate(`/search/results?keyword=${term}`);
  };

  return (
    <div css={containerStyle}>
      <div css={titleSectionStyle}>
        <h2 css={TypoTitleXsSB}>최근 검색어</h2>
        <button onClick={clearAllSearchTerms} css={[allClearButtonStyle, TypoCapSmM]}>
          모두 지우기
        </button>
      </div>
      <div css={searchListStyle}>
        {recentSearches.length === 0 ? (
          <EmptyMessage message="최근 검색어가 없습니다." />
        ) : (
          recentSearches.map((search, index) => (
            <div key={index} css={searchItemStyle}>
              <span
                onClick={() => {
                  handleClickSearchItem(search);
                }}
                css={TypoBodyMdR}
              >
                {search}
              </span>
              <button
                onClick={() => {
                  removeSearchTerm(index);
                }}
                css={deleteButtonStyle}
                aria-label={`${search} 삭제`}
              >
                <img src="/img/icon-close-gray700.svg" alt="최근검색어삭제버튼" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentSearches;

const containerStyle = css`
  padding: 0.5rem 0 2rem;
  border-bottom: 0.1rem solid ${variables.colors.gray200};
`;

const titleSectionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const allClearButtonStyle = css`
  color: ${variables.colors.gray600};
  cursor: pointer;
`;

const searchListStyle = css`
  display: flex;
  overflow-x: auto;
  cursor: pointer;
  padding-top: 1.6rem;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const searchItemStyle = css`
  margin-right: 1rem;
  padding: 0.4rem 0.5rem 0.4rem 0.9rem;
  border: 0.1rem solid ${variables.colors.gray400};
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  height: 3rem;

  span {
    margin-top: 0.1rem;
  }
`;

const deleteButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.6rem;
  height: 1.6rem;

  & > img {
    width: 0.9rem;
    height: 0.9rem;
  }
`;
