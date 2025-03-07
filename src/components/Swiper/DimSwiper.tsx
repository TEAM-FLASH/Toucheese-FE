/** @jsxImportSource @emotion/react */

import { useDimSwiperStore } from '@store/useDimSwiperStore';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass } from 'swiper/react';

import { css } from '@emotion/react';
import { Hidden, TypoBodyMdR } from '@styles/Common';
import 'swiper/css';

interface IDimSwiper<T extends { id: number }> {
  children: ReactNode;
  data: T[];
  setSlideSet: Dispatch<SetStateAction<T[]>>;
}

const DimSwiper = <T extends { id: number }>({ children, data, setSlideSet }: IDimSwiper<T>) => {
  const { selectedId, setSelectedId } = useDimSwiperStore();
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [firstSlide, setFirstSlide] = useState<number>();
  const [lastSlide, setLastSlide] = useState<number>();
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const slideIndexMap = useMemo(() => new Map(), []);

  const getNewSlideSet = (clickedId: number) => {
    return data.filter(
      ({ id }: { id: number }) => id === clickedId || id === clickedId - 1 || id === clickedId + 1,
    );
  };

  const setIndexByPortfolioId = () => {
    for (let i = 0; i < data.length; i++) {
      slideIndexMap.set(data[i].id, i + 1);
    }
  };

  const handleChange = () => {
    if (!swiperRef || !firstSlide || !lastSlide) return null;
    const toNext = swiperRef.swipeDirection === 'next';
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
  };

  const swiperOption = {
    modules: [Navigation],
    onSwiper: (e: SwiperClass) => setSwiperRef(e),
    onTransitionEnd: handleChange,
    slidesPerView: 1,
    initialSlide: selectedId === firstSlide ? 0 : 1,
    centeredSlides: true,
    spaceBetween: 20,
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
      <>
        <p css={[TypoBodyMdR, TitleStyle]}>
          <h3>
            {activeIndex} <span css={Hidden}>번째</span>{' '}
          </h3>
          <i>/</i>
          {data.length}
        </p>
        <Swiper {...swiperOption}>{children}</Swiper>
      </>
    )
  );
};

export default DimSwiper;

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
`;

export const SlideImgBox = css`
  background: #0f0f0f;
  padding: 1rem;
  border-radius: 0.6rem;
  margin-bottom: 1rem;

  img {
    aspect-ratio: 308/340;
    object-fit: scale-down;
  }
`;
