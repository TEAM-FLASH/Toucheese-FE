/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import PCSearchBox from './PCSearchBox';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const queryParams = new URLSearchParams(window.location.search);
  const searchTerm = queryParams.get('keyword') || '';

  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(false);
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    if (isFocused) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFocused]);

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

      setIsFocused(false);
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
    <div css={wrapperStyle} ref={wrapperRef}>
      <div css={containerStyle}>
        <input
          css={TypoTitleXsM}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="스튜디오를 검색해보세요."
          onFocus={() => {
            setIsFocused(true);
          }}
          onMouseDown={() => {
            setIsFocused(true);
          }}
        />

        <div css={searchIconWrapStyle}>
          <img
            className="search-mobile"
            src="/img/icon-search-gray500.svg"
            alt="검색 아이콘(모바일)"
          />
          <img className="search-pc" src="/img/icon-search-gray700.svg" alt="검색 아이콘(PC)" />
        </div>

        {inputValue && (
          <button onClick={handleClear} css={clearButtonStyle}>
            <img src="/img/icon-cancel.svg" alt="모두지우기버튼" css={clearsearchStyle} />
          </button>
        )}

        {isPc && isFocused && (
          <div css={dropdownWrapper}>
            <PCSearchBox />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

const wrapperStyle = css`
  position: relative;
  width: 100%;
`;

const containerStyle = css`
  box-shadow: inset 0 0 20px gold;
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

    ${mqMin(breakPoints.pc)} {
      all: unset;
      width: 100%;
      background-color: ${variables.colors.gray200};
      padding: 1.1rem 4.6rem 1.1rem 6.2rem;
      box-sizing: border-box;
      ${TypoTitleXsM}
      color: ${variables.colors.gray500};
      border-radius: 0.8rem;
      position: relative;

      &:focus {
        color: ${variables.colors.black};

        ${mqMin(breakPoints.pc)} {
          outline: none;
        }
      }
    }
  }
`;

const searchIconWrapStyle = css`
  position: absolute;
  left: 1.3rem;
  display: flex;
  align-items: center;

  .search-mobile {
    display: block;
    width: 2.4rem;
    height: 2.4rem;
  }
  .search-pc {
    display: none;
  }

  ${mqMin(breakPoints.pc)} {
    left: 2.1rem;
    top: 50%;
    transform: translateY(-50%);

    .search-mobile {
      display: none;
    }
    .search-pc {
      display: block;
      width: 2.6rem;
      height: 2.6rem;
    }
  }
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

const clearsearchStyle = css`
  width: 2rem;
  height: 2rem;
  display: block;
`;

const dropdownWrapper = css`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${variables.colors.white};
  border: 0.2rem solid ${variables.colors.gray400};
  box-shadow: 0 0.9rem 0.3rem -0.8rem ${variables.colors.gray400};
  border-radius: 1rem;
  z-index: 10;
  padding: 2.4rem;
  margin-top: 1.6rem;
`;
