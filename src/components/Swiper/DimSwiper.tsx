/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useDimSwiperStore } from '@store/useDimSwiperStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Hidden, TypoBodyMdR } from '@styles/Common';
import variables from '@styles/Variables';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass } from 'swiper/react';
import { NavigationOptions } from 'swiper/types';

interface IDimSwiper<T extends { id: number }> {
  children: React.ReactNode;
  data: T[];
  setSlideSet: React.Dispatch<React.SetStateAction<T[]>>;
}

const DimSwiper = <T extends { id: number }>({ children, data, setSlideSet }: IDimSwiper<T>) => {
  const { selectedId, setSelectedId } = useDimSwiperStore();
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [firstSlide, setFirstSlide] = useState<number>();
  const [lastSlide, setLastSlide] = useState<number>();
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const slideIndexMap = useMemo(() => new Map(), []);

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const [lastSwipeDirection, setLastSwipeDirection] = useState('');

  const getNewSlideSet = (clickedId: number) => {
    return data.filter(
      ({ id }: { id: number }) => id === clickedId || id === clickedId - 1 || id === clickedId + 1,
    );
  };

  const setIndexByPortfolioId = () => {
    for (let i = 0; i < data.length; i++) slideIndexMap.set(data[i].id, i + 1);
  };

  const handleInitNav = (swiper: SwiperClass) => {
    const navigation = swiper.params.navigation as NavigationOptions;
    navigation.prevEl = prevBtnRef.current;
    navigation.nextEl = nextBtnRef.current;
  };

  const handleChange = () => {
    if (!swiperRef || !firstSlide || !lastSlide) return null;
    const swipeDirection = lastSwipeDirection || swiperRef.swipeDirection;
    const toNext = swipeDirection === 'next';
    const direction = toNext ? 1 : -1;

    // 첫번째, 마지막 슬라이드에서 슬라이드 변경 금지
    if (selectedId === firstSlide) if (!toNext) return;
    if (selectedId === lastSlide) if (toNext) return;

    // 두번째 슬라이드에서 이전 방향으로 변경된 경우
    if (selectedId === firstSlide + 1 && !toNext) {
      setSelectedId(selectedId, direction);
      swiperRef.slideTo(0, 0, false);
      return;
    }

    setSelectedId(selectedId, direction);
    swiperRef.slideTo(1, 0, false);
    setLastSwipeDirection('');
  };

  const swiperOption = {
    modules: [Navigation],
    onSwiper: (e: SwiperClass) => setSwiperRef(e),
    onBeforeInit: (e: SwiperClass) => handleInitNav(e),
    onTransitionEnd: handleChange,
    slidesPerView: 1,
    initialSlide: selectedId === firstSlide ? 0 : 1,
    centeredSlides: true,
    spaceBetween: 20,
    navigation: {
      prevEl: prevBtnRef.current,
      nextEl: nextBtnRef.current,
    },
  };

  useEffect(() => {
    setIndexByPortfolioId();
    if (data) {
      setFirstSlide(data[0].id);
      setLastSlide(data[data.length - 1].id);
    }
  }, []);

  useLayoutEffect(() => {
    setSlideSet(getNewSlideSet(selectedId));
    setActiveIndex(slideIndexMap.get(selectedId));
  }, [selectedId]);

  return (
    firstSlide && (
      <div css={dimSwiperBox}>
        <p css={[TypoBodyMdR, TitleStyle]}>
          <h3>
            {activeIndex} <span css={Hidden}>번째</span>{' '}
          </h3>
          <i>/</i>
          {data.length}
        </p>
        <Swiper {...swiperOption}>{children}</Swiper>
        <div>
          <button
            onClick={() => setLastSwipeDirection('prev')}
            className="swiper-button swiper-button-prev"
            ref={prevBtnRef}
          ></button>
          <button
            onClick={() => setLastSwipeDirection('next')}
            className="swiper-button swiper-button-next"
            ref={nextBtnRef}
          ></button>
        </div>
      </div>
    )
  );
};

export default DimSwiper;

const dimSwiperBox = css`
  .swiper-button {
    color: ${variables.colors.white};
    width: 4.4rem;
    aspect-ratio: 1/1;
    font-size: 3.2rem;

    &::after {
      font-size: inherit;
    }
  }

  .swiper-button-prev {
    left: 0;
    transform: translateX(calc(-100% - ${variables.layoutPadding}));
  }
  .swiper-button-next {
    right: 0;
    transform: translateX(calc(100% + ${variables.layoutPadding}));
  }
`;

const TitleStyle = css`
  padding: 1.8rem 0;
  text-align: center;
  position: absolute;
  inset: 0;
  bottom: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  i {
    font-style: normal;
  }

  ${mqMin(breakPoints.pc)} {
    height: 7.2rem;
  }
`;

export const SlideImgBox = css`
  background: #0f0f0f;
  padding: 1rem;
  border-radius: 0.6rem;
  margin-bottom: 1rem;

  img {
    aspect-ratio: 308/340;
    object-fit: scale-down;

    ${mqMin(breakPoints.pc)} {
      aspect-ratio: 764/404;
    }
  }
`;
