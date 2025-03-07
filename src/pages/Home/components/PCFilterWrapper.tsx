/** @jsxImportSource @emotion/react */

import FilterPriceSlidePC from '@components/FilterPriceSlide/FilterPriceSlidePC';
import ServiceAvailability from '@components/ServiceAvailability/ServiceAvailability';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { decodeSearchParamsToString } from '@utils/decodeSearchParams';
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { keyframes } from '@emotion/react';
import { Hidden } from '@styles/Common';
import { useFilterStore } from '@store/useFilterStore';

const PCFilterWrapper = () => {
  const [searchParams] = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { minPrice, maxPrice, selectedServices, resetFilter } = useFilterStore();

  // URL 파라미터 기준으로 필터 적용 상태 확인
  const hasAppliedFilters = () => {
    return (
      searchParams.has('minPrice') || searchParams.has('maxPrice') || searchParams.has('options')
    );
  };

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams);

    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (selectedServices.length > 0) {
      params.set('options', selectedServices.join('%'));
    }

    navigate(`?${decodeSearchParamsToString(params)}`);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
    // 전역 상태 초기화
    resetFilter();
    window.location.href = '';
    // URL 파라미터 초기화
    const paramsToDelete = ['sortBy', 'minPrice', 'maxPrice', 'options'];
    paramsToDelete.forEach((param) => searchParams.delete(param));
    navigate(`?${decodeSearchParamsToString(searchParams)}`);
  };

  return (
    <>
      <FilterPriceSlidePC />
      <ServiceAvailability isPc={true} />

      <FilterButtonBoxStyle>
        <ButtonWrapperStyle onClick={handleReset} className={isAnimating ? 'rotateIcon' : ''}>
          <span css={Hidden}>초기화</span>
          <Button
            text=""
            type="reset"
            variant="gray"
            icon={
              <RotateIconStyle
                className={isAnimating ? 'rotateIcon' : ''}
                src="/img/icon-reset.svg"
                alt="필터 초기화"
              />
            }
            onClick={handleReset}
          />
        </ButtonWrapperStyle>
        <Button
          type="button"
          size="medium"
          text={hasAppliedFilters() ? '적용 중' : '필터 적용하기'}
          width="max"
          variant="black"
          onClick={handleApplyFilter}
        />
      </FilterButtonBoxStyle>
    </>
  );
};

export default PCFilterWrapper;

const FilterButtonBoxStyle = styled.div`
  background-color: ${variables.colors.white};
  padding: 1.6rem 0 2.6rem;
  position: fixed;
  width: 19.2rem;
  z-index: 9;
  bottom: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
`;

const ButtonWrapperStyle = styled.div`
  display: inline-block;
`;

const rotateIcon = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const RotateIconStyle = styled.img`
  &.rotateIcon {
    animation: ${rotateIcon} 0.4s ease-out;
  }
`;
