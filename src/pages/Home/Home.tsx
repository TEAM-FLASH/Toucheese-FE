/** @jsxImportSource @emotion/react */

import BookingButton from '@components/BookingSearchContainer/BookingButton';
import BookingSearchContainer from '@components/BookingSearchContainer/BookingSearchContainer';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import Button from '@components/Button/Button';
import Filter from '@components/Filter/Filter';
import FilterTextSelector from '@components/Filter/FilterTextSelector';
import FilterPriceSlideComponent from '@components/FilterPriceSlide/FilterPriceSlide';
import ThemeNavigator from '@components/Navigator/ThemeNavigator';
import ServiceAvailability from '@components/ServiceAvailability/ServiceAvailability';
import StudioList from '@components/Studio/StudioList';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useGetWindowWidth from '@hooks/useGetWindowWidth';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, PCLayout } from '@styles/Common';
import variables from '@styles/Variables';
import { decodeSearchParamsToString } from '@utils/decodeSearchParams';
import { remToPx } from '@utils/remToPx';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SortBy } from 'types/types';
import LocalDateSelectionModal from './components/LocalDateSelectionModal';
import PCFilterWrapper from './components/PCFilterWrapper';
import { useMediaQuery } from 'react-responsive';

interface IFixedProps {
  isFixed: boolean;
}

export type Options = {
  원본: string;
  주차: string;
  보정: string;
  헤메코: string;
  정장: string;
  탈의실: string;
  파우더룸: string;
};

const Home = () => {
  const [searchParams] = useSearchParams();
  const [isFixed, setIsFixed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const homeRef = useRef<HTMLTableSectionElement | null>(null);
  const navigate = useNavigate();
  const windowWidth = useGetWindowWidth();
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPc]);

  useEffect(() => {
    // 로그인 완료 후 예약페이지로 돌아가기
    const lastPage = window.sessionStorage.getItem('lastPage');

    if (lastPage) {
      navigate(lastPage);
      window.sessionStorage.removeItem('lastPage');
    }
  }, []);

  // 스크롤에 따라 Navigator 고정
  useEffect(() => {
    const handleScroll = () => {
      if (homeRef.current) {
        const rect = homeRef.current.getBoundingClientRect();
        const threshold = windowWidth >= 1024 ? remToPx(8) : -1 * remToPx(8.8);

        setIsFixed(rect.top <= threshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowWidth]);

  const { openBottomSheet } = useBottomSheetState();

  const handleFilterByPopularity = () => {
    openBottomSheet(<FilterTextSelector />, '정렬');
  };

  const handleFilterByPriceRange = () => {
    openBottomSheet(<FilterPriceSlideComponent />, '가격');
  };

  const handleFilterByStoreInfo = () => {
    openBottomSheet(<ServiceAvailability />, '매장정보');
  };

  const handleReset = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 50);
    const paramsToDelete = ['sortBy', 'minPrice', 'maxPrice', 'options'];
    paramsToDelete.forEach((param) => searchParams.delete(param));
    navigate(`?${decodeSearchParamsToString(searchParams)}`);
  };

  const sortBy: SortBy = {
    VIEW_COUNT: '조회순',
    POPULARITY: '인기순',
    RATING: '평점순',
    REVIEW_COUNT: '리뷰 많은순',
  };

  const options: Options = {
    보정: '보정',
    원본: '원본',
    주차: '주차',
    헤메코: '헤메코',
    정장: '정장',
    탈의실: '탈의실',
    파우더룸: '파우더룸',
  };

  return (
    <>
      <Helmet>
        <title>
          {searchParams.get('vibeName')
            ? `스튜디오 조회 - ${searchParams.get('vibeName')}`
            : '세상의 모든 사진관, 터치즈'}
        </title>
        <meta name="description" content="터치즈에서 원하는 스튜디오를 검색해보세요!" />
        <meta
          property="og:title"
          content={
            searchParams.get('vibeName')
              ? `스튜디오 조회 - ${searchParams.get('vibeName')}`
              : '세상의 모든 사진관, 터치즈'
          }
        />
        <meta property="og:description" content="터치즈에서 원하는 스튜디오를 검색해보세요!" />
      </Helmet>

      <NavigatorStyle isFixed={isFixed}>
        <div
          css={css`
            ${mqMin(breakPoints.pc)} {
              ${PCLayout}
              ${bg100vw(variables.colors.black)}
              display: flex;
              align-items: center;
              gap: 5.2rem;
              padding: 0 ${variables.layoutPadding};
            }
          `}
        >
          <BookingButton type="pc" />
          <ThemeNavigator />
        </div>

        {/* 모바일 필터 영역 */}
        <FilterBoxStyle className="mo">
          <ButtonWrapperStyle onClick={handleReset} className={isAnimating ? 'rotateIcon' : ''}>
            <Button type="reset" iconResetSize="small" variant="gray" />
          </ButtonWrapperStyle>
          <div className="filterScroll">
            <Filter
              params={window.location.search}
              text="인기순"
              paramsKeyword={sortBy}
              paramsName="sortBy"
              onClick={handleFilterByPopularity}
            />
            <Filter
              params={window.location.search}
              paramsName={'minPrice'}
              text="가격대"
              onClick={handleFilterByPriceRange}
            />
            <Filter
              params={window.location.search}
              text="매장정보"
              paramsKeyword={options}
              paramsName="options"
              onClick={handleFilterByStoreInfo}
            />
          </div>
        </FilterBoxStyle>
      </NavigatorStyle>

      <SectionStyle ref={homeRef}>
        {/* 모바일 지역, 날짜 선택 버튼 */}
        <BookingSearchContainer />

        {/* PC 버전 컨텐츠 */}
        <div
          css={css`
            ${mqMin(breakPoints.pc)} {
              display: flex;
              gap: 3.2rem;
              position: relative;
            }
          `}
        >
          {/* PC 필터 영역 */}
          <FilterSectionStyle className="pc" isFixed={isFixed}>
            <div>
              <PCFilterWrapper />
            </div>
          </FilterSectionStyle>
          <ListStyle>
            <StudioList mode="filter" searchParams={searchParams} />
          </ListStyle>
        </div>
      </SectionStyle>
      <BottomSheet />
      <LocalDateSelectionModal modalId={1} />
    </>
  );
};

const SectionStyle = styled.section`
  padding-top: 2rem;
  position: relative;

  ${mqMin(breakPoints.pc)} {
    padding-top: calc(13.8rem - ${variables.headerHeight});
  }
`;

const NavigatorStyle = styled.div<IFixedProps>`
  position: ${(props) => (props.isFixed ? 'fixed' : 'absolute')};
  top: ${(props) => (props.isFixed ? '0' : '8.8rem')};
  left: 0;
  right: 0;
  z-index: 9;

  ${mqMin(breakPoints.pc)} {
    position: ${(props) => (props.isFixed ? 'fixed' : 'absolute')};
    top: 8rem;
    z-index: 5;
  }
`;

const ButtonWrapperStyle = styled.div`
  display: inline-block;
`;

const FilterBoxStyle = styled.div`
  width: 100%;
  padding: 1.2rem 0rem 1.2rem 1.6rem;
  display: flex;
  gap: 0.6rem;
  box-shadow: 0 0 2px ${variables.colors.gray500};
  position: relative;
  background-color: ${variables.colors.white};

  & ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
  }

  & > Button {
    flex-shrink: 0;
    margin: auto 0;
  }

  .filterScroll {
    padding-left: 1rem;
    padding-right: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* 모바일 스크롤 */
    scrollbar-width: thin; /* 크롬, 파이어폭스에서 스크롤바 스타일 */
    white-space: nowrap;
    display: flex;
    gap: 0.8rem;
    position: relative;
  }

  /* 크롬, 사파리 */
  .filterScroll::-webkit-scrollbar {
    display: none;
  }

  .filterScroll {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE, Edge */
  }

  &::after {
    content: '';
    position: absolute;
    top: 10%;
    left: 4.8rem;
    bottom: 0;
    z-index: 1;
    height: 80%;
    width: 0.6rem;
    box-shadow: 0.4rem 0 0.2rem rgba(255, 255, 255, 10);

    background-color: ${variables.colors.white};
  }

  ${mqMin(breakPoints.pc)} {
    display: none;
  }
`;

const FilterSectionStyle = styled.div<IFixedProps>`
  flex-shrink: 0;
  padding-top: 3rem;
  padding-bottom: 8.2rem;
  position: sticky;
  top: 13.8rem;
  left: 0;
  width: 19.2rem;
  height: calc(100vh - 13.8rem);

  overflow-y: auto;
  /* 크롬, 사파리,*/
  &::-webkit-scrollbar {
    display: none;
  }

  /* 엣지 */
  -ms-overflow-style: none;

  /* 파이어폭스 */
  scrollbar-width: none;
`;

const ListStyle = styled.div`
  padding-top: 10.8rem;

  ${mqMin(breakPoints.pc)} {
    padding: unset;
    padding-right: 1.6rem;
    flex-grow: 1;
  }
`;

export default Home;
