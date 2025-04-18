/** @jsxImportSource @emotion/react */
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import StudioList from '@components/Studio/StudioList';
import BackButton from '@components/BackButton/BackButton';
import { Helmet } from 'react-helmet-async';
import { breakPoints } from '@styles/BreakPoint';
import { useMediaQuery } from 'react-responsive';
import SearchBar from '@components/Search/SearchBar';

const SearchResults = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('keyword') || '';

  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  return (
    <div>
      <Helmet>
        <title>{searchTerm ? `${searchTerm} - 검색 결과` : '검색 결과'}</title>
        <meta
          property="og:title"
          content={searchTerm ? `${searchTerm} - 검색 결과` : '검색 결과'}
        />
        <meta
          property="og:description"
          content={
            searchTerm
              ? `"${searchTerm}"와 관련된 스튜디오 검색 결과입니다.`
              : '스튜디오 검색 결과 페이지입니다.'
          }
        />
        <meta property="og:url" content={`${window.location.href}`} />
      </Helmet>
      {!isPc && (
        <div css={searchHeaderStyle}>
          <BackButton to="/search" replace ariaLabel="검색 페이지로 돌아가기" />
          <SearchBar />
        </div>
      )}

      <StudioList
        mode="search/result"
        searchParams={new URLSearchParams({ keyword: searchTerm })}
      />
    </div>
  );
};

export default SearchResults;

const searchHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.6rem;
  padding-top: 2rem;
`;
