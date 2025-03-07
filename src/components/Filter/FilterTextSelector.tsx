import styled from '@emotion/styled';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import { TypoTitleSmS } from '@styles/Common';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterTextSelector = () => {
  const FilterByPopularity = ['인기순', '조회순', '평점순', '리뷰 많은순'];
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const navigate = useNavigate();
  const { closeBottomSheet } = useBottomSheetState();

  const handleClick = (item: string) => {
    console.log(selectedIndex);
    setSelectedIndex(item);
    let Nav: 'POPULARITY' | 'VIEW_COUNT' | 'RATING' | 'REVIEW_COUNT';
    if (item === '인기순') {
      Nav = 'POPULARITY';
    } else if (item === '조회순') {
      Nav = 'VIEW_COUNT';
    } else if (item === '평점순') {
      Nav = 'RATING';
    } else {
      Nav = 'REVIEW_COUNT';
    }
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('sortBy', Nav);
    navigate(`/?${searchParams.toString()}`);
    closeBottomSheet();
  };

  return (
    <PopularBox>
      <ul>
        {FilterByPopularity.map((v, i) => (
          <ListItem key={i} onClick={() => handleClick(v)} isSelected={selectedIndex === v}>
            {v}
          </ListItem>
        ))}
      </ul>
    </PopularBox>
  );
};

const PopularBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  ${TypoTitleSmS};
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  cursor: pointer;
  display: block;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  ${(props) =>
    props.isSelected &&
    `
    &::after {
        content: '';
        position: absolute;
        top: 25%;
        transform: translateX(100%);
        width: 1.5rem;
        height: 1.1rem;
        background-size: contain;
        background-image: url('/img/icon-check-cheese800.svg');
      }
  `}
`;

export default FilterTextSelector;
