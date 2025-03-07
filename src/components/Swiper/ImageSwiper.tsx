/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import variables from '@styles/Variables';
import { IPortfolio, IReviewImages } from 'types/types';
import 'swiper/css';

interface ImageSwiperProps extends SwiperProps {
  images: IPortfolio[] | IReviewImages[];
  imageStyle?: ReturnType<typeof css>;
  imgprops?: {
    customStyle?: ReturnType<typeof css>;
    loading?: string;
    onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  };
}
const ImageSwiper = ({
  images,
  modules = [Mousewheel, Pagination],
  mousewheel = { forceToAxis: true, sensitivity: 1 },
  spaceBetween = 3,
  slidesPerView = 3.6,
  imageStyle,
  ...props
}: ImageSwiperProps) => {
  const isPaginationActive = slidesPerView === 1;
  // 이미지 5개 불러오기
  const getImages = (photos: IPortfolio[] | IReviewImages[]) => {
    let images: string[] = [];
    const portfolios = photos.slice(0, 5);

    portfolios.forEach((photo: IPortfolio | IReviewImages) => {
      images.push(photo.url);
    });

    return images;
  };

  const conditionalContainerStyle =
    slidesPerView === 1 ? containerFullStyle : containerDefaultStyle;

  return (
    <div css={conditionalContainerStyle}>
      <Swiper
        className="imageSwiper"
        css={swiperStyle}
        modules={modules}
        mousewheel={mousewheel}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        pagination={isPaginationActive ? { clickable: true, type: 'bullets' } : undefined}
        {...props}
      >
        {getImages(images).map((image, index) => (
          <SwiperSlide key={index}>
            <img css={[defaultImageStyle, imageStyle]} src={image} alt={`이미지 ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;

//단일이미지
const containerFullStyle = css`
  margin-left: calc(-1 * ${variables.layoutPadding});
`;

//다중이미지
const containerDefaultStyle = css`
  margin-bottom: 1.4rem;
  margin-left: calc(${variables.layoutPadding}*-1);
  width: calc(100% + ${variables.layoutPadding});
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: ${variables.layoutPadding};
    height: 100%;
    z-index: 1;
    transform: translateX(100%);
  }
  .swiper {
    padding: 0 ${variables.layoutPadding};
  }
`;

const swiperStyle = css`
  width: calc(100% + ${variables.layoutPadding});

  & .swiper-pagination.swiper-pagination-horizontal {
    position: absolute;
    z-index: 10;
    bottom: 15px;
    left: 50%;
    width: 8rem;
    display: flex;
    justify-content: center;
    transform: translateX(-50%);
  }

  & .swiper-pagination.swiper-pagination-horizontal .swiper-pagination-bullet {
    background-color: ${variables.colors.white};
    opacity: 0.8;
    width: 100%;
    height: 0.2rem;
    margin: 0;
    transition: all 0.3s ease;
    border-radius: 0;
    cursor: pointer;
  }

  & .swiper-pagination.swiper-pagination-horizontal .swiper-pagination-bullet-active {
    background-color: ${variables.colors.black};
    opacity: 1;
  }
`;

const defaultImageStyle = css`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
