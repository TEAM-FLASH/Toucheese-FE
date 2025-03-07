/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';
import { TypoTitleXsR } from '@styles/Common';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const queryParams = new URLSearchParams(window.location.search);
  const searchTerm = queryParams.get('keyword') || '';

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      setInputValue(searchTerm);
    }
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      const savedSearches = localStorage.getItem('recentSearches');
      const recentSearches = savedSearches ? JSON.parse(savedSearches) : [];

      if (!recentSearches.includes(term)) {
        recentSearches.unshift(term);
        if (recentSearches.length > 10) {
          recentSearches.pop();
        }
      }

      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

      navigate(`/search/results?keyword=${term}`);
      setInputValue('');
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(inputValue);
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div css={containerStyle}>
      <input
        css={TypoTitleXsR}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder="스튜디오를 검색해보세요."
      />
      <img src="/img/icon-search-gray500.svg" alt="검색모양아이콘" css={searchIconStyle} />
      {inputValue && (
        <button onClick={handleClear} css={clearButtonStyle}>
          <img src="/img/icon-cancel.svg" alt="모두지우기버튼" css={clearIconStyle} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

const containerStyle = css`
  position: relative;
  border-radius: 1rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  input {
    padding: 0 4rem;
    color: ${variables.colors.black};
    height: 4.4rem;
    background-color: ${variables.colors.gray200};
    border: none;

    &:focus {
      outline: 0.1rem solid ${variables.colors.gray500};
    }
  }
`;

const searchIconStyle = css`
  position: absolute;
  left: 1.3rem;
  width: 2.4rem;
  height: 2.4rem;
`;

const clearButtonStyle = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  right: 1.5rem;
  height: 100%;
`;

const clearIconStyle = css`
  width: 2rem;
  height: 2rem;
  display: block;
`;
