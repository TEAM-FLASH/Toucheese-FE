/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import variables from '@styles/Variables';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/** 가격 필터 슬라이더 컴포넌트 */
const FilterPriceSlideComponent = () => {
  // 가격 범위 설정을 위한 상수값
  const fixedMinPrice = 10000;
  const fixedMaxPrice = 200000;
  const priceGap = 0; // 최소-최대 가격 간 최소 간격

  const navigate = useNavigate();
  const { closeBottomSheet } = useBottomSheetState();

  const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
  const [rangeMinPercent, setRangeMinPercent] = useState(1);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(100);

  /** 최소 가격 범위 변경 핸들러 */
  const priceRangeMinValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value + priceGap <= rangeMaxValue) {
      setRangeMinValue(value);
    }
  };

  /** URL 파라미터에 선택된 가격 범위 적용 */
  const handleApplyClick = () => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('minPrice', rangeMinValue.toString());
    currentParams.set('maxPrice', rangeMaxValue.toString());
    navigate(`?${currentParams.toString()}`);
    closeBottomSheet();
  };

  /** 최대 가격 범위 변경 핸들러 */
  const priceRangeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value - priceGap >= rangeMinValue) {
      setRangeMaxValue(value);
    }
  };

  /** 슬라이더 위치 퍼센트 계산 */
  const twoRangeHandler = () => {
    setRangeMinPercent((rangeMinValue / fixedMaxPrice) * 100);
    setRangeMaxPercent((rangeMaxValue / fixedMaxPrice) * 100);
  };

  // useResetState 훅 사용 부분 수정
  const resetState = () => {
    setRangeMinValue(fixedMinPrice);
    setRangeMaxValue(fixedMaxPrice);
    setRangeMinPercent(1);
    setRangeMaxPercent(100);
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.delete('minPrice'); // 최소 가격 파라미터 삭제
    currentParams.delete('maxPrice'); // 최대 가격 파라미터 삭제
    navigate(`?${currentParams.toString()}`); // 업데이트된 URL로 이동
  };

  // handleResetClick 함수는 그대로 사용
  const handleResetClick = () => {
    resetState();
  };

  /** 가격 표시 형식을 한국어 원 단위로 변환 (예: 10,000원) */
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  return (
    <>
      <ValueDisplay>
        <ValueDisplaySpanStyle>{formatPrice(rangeMinValue)}원~ </ValueDisplaySpanStyle>
        <ValueDisplaySpanStyle>{formatPrice(rangeMaxValue)} 원 이상</ValueDisplaySpanStyle>
      </ValueDisplay>
      <FilterPriceRangeWrap>
        <FilterPriceRangeMin
          type="range"
          min={fixedMinPrice}
          max={fixedMaxPrice - priceGap}
          step="1000"
          value={rangeMinValue}
          aria-label="slider1"
          onChange={(e) => {
            priceRangeMinValueHandler(e);
            twoRangeHandler();
          }}
        />
        <FilterPriceRangeMax
          type="range"
          min={fixedMinPrice + priceGap}
          max={fixedMaxPrice}
          step="1000"
          aria-label="slider2"
          value={rangeMaxValue}
          onChange={(e) => {
            priceRangeMaxValueHandler(e);
            twoRangeHandler();
          }}
        />
        <PriceRangeTrack>
          <TrackFilled
            style={{
              left: `${rangeMinPercent + 1}%`,
              right: `${100 - rangeMaxPercent}%`,
            }}
          />
        </PriceRangeTrack>
      </FilterPriceRangeWrap>
      <RangeDisplay>
        <RangeDisplaySpanStyle>1만원</RangeDisplaySpanStyle>
        <RangeDisplaySpanStyle>10만원</RangeDisplaySpanStyle>
        <RangeDisplaySpanStyle>20만원</RangeDisplaySpanStyle>
      </RangeDisplay>
      <ButtonWrapperStyle>
        <Button
          size="large"
          disabled={false}
          text={`초기화`}
          width="fit"
          variant="gray"
          onClick={handleResetClick}
          type="button"
        />
        <Button
          size="large"
          disabled={false}
          text={`적용하기`}
          width="max"
          variant="black"
          onClick={handleApplyClick}
          type="button"
        />
      </ButtonWrapperStyle>
    </>
  );
};

export default FilterPriceSlideComponent;

const FilterPriceRangeWrap = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
`;

const FilterPriceRangeMin = styled.input`
  position: absolute;
  pointer-events: none;
  top: 0;
  height: 7px;
  width: 99%;
  appearance: none;
  background: none;
  z-index: 1;

  &::-webkit-slider-thumb {
    height: 2.6rem;
    pointer-events: auto;
    width: 2.6rem;
    border-radius: 50%;
    border: 0.1rem solid ${variables.colors.primary};
    background-color: #fff8e1;
    -webkit-appearance: none;
    z-index: 99;
    margin-top: -1.2rem;
  }
`;

const FilterPriceRangeMax = styled(FilterPriceRangeMin)``;

const PriceRangeTrack = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 0.8rem;
  background-color: ${variables.colors.gray200};
  border-radius: ${variables.borderRadius};
`;

const TrackFilled = styled.div`
  position: absolute;
  height: 0.8rem;
  background-color: ${variables.colors.primary700};
`;

const ValueDisplay = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;
const ValueDisplaySpanStyle = styled.span`
  font-size: ${variables.size.large};
  font-weight: 600;
`;
const RangeDisplay = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3.6rem;
`;
const RangeDisplaySpanStyle = styled.span`
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray500};
`;

const ButtonWrapperStyle = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 3.2rem;
`;
