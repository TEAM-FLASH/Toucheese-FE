/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Hidden } from '@styles/Common';
import { useNavigate } from 'react-router-dom';

const SearchButton = () => {
  const navigate = useNavigate();

  return (
    <ButtonStyle
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        navigate('/search');
      }}
    >
      <span css={Hidden}>검색</span>
      <img src="/img/icon-search.svg" alt="스튜디오 검색" />
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
    width: 1.7rem;
    height: 1.7rem;
  }

  ${mqMin(breakPoints.pc)} {
    width: 6rem;
    height: 6rem;

    & > img {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
`;

export default SearchButton;
