/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useState } from 'react';
import Dropdown from './DropDown';

interface StudioReviewCategoriesProps {
  avgRating?: number;
  totalReviewNum: number;
  menuNameList: string[];
  menuIdList: number[];
  onFilterChange: (menuId: number | null) => void;
}

/** 리뷰에 대한 필터링 컴포넌트 */
const StudioReviewCategories = ({ avgRating, totalReviewNum, menuNameList, menuIdList, onFilterChange }: StudioReviewCategoriesProps) => {
  const FILTER_OPTIONS = ['전체리뷰', ...menuNameList];
  const [selectedOption, setSelectedOption] = useState('전체리뷰');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);

    if (option === '전체리뷰') {
      onFilterChange(null);
    } else {
      const index = menuNameList.indexOf(option);
      if (index !== -1) {
        onFilterChange(menuIdList[index]);
      }
    }
  };

  return (
    <Container>
      <CategoryWrapper>
        <Dropdown options={FILTER_OPTIONS} selectedOption={selectedOption} onSelect={handleOptionSelect} />
        <Button text="사진 리뷰만 보기" variant="white" active={false} size="small" width="fit" />
      </CategoryWrapper>
      <RatingWrapper>
        <RatingIcon src="/img/icon-rating.svg" alt="평점" />
        <RatingScore>{avgRating}</RatingScore>
        <ReviewCount>{totalReviewNum}개의 리뷰</ReviewCount>
      </RatingWrapper>
    </Container>
  );
};

export default StudioReviewCategories;

const Container = styled.div`
  width: 100%;
  padding: 1.8rem 0;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const RatingIcon = styled.img`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.2rem;
  display: flex;
  align-items: center;
`;

const RatingScore = styled.p`
  font-weight: 600;
  margin-right: 0.8rem;
  display: flex;
  align-items: center;
  line-height: 1;
`;
const ReviewCount = styled.p`
  color: ${variables.colors.black};
  display: flex;
`;
