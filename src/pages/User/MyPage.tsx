/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { css } from '@emotion/react';
import { useGetReservationList } from '@hooks/useGetReservationList';
import useToast from '@hooks/useToast';
import { loadUserFromStorage, useUserStore } from '@store/useUserStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { DividerStyle, TypoBodyMdR, TypoTitleMdSb, TypoTitleXsR } from '@styles/Common';
import variables from '@styles/Variables';
import { sortReservations } from '@utils/sortReservations';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IResvRes } from 'types/types';

const MyPage = () => {
  const { username, email } = useUserStore();
  const { pathname } = useLocation();
  const [filteredData, setFilteredData] = useState<IResvRes | null>(null);
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  // 암호화 된 유저 정보 복호화
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  //현재 날짜와 예약 날짜 비교 함수
  const openToast = useToast();
  const navigate = useNavigate();

  const { data, error } = useGetReservationList('RESERVED');

  useEffect(() => {
    if (error) {
      if (error.message === '403') {
        openToast('로그인 세션이 만료되었습니다. 다시 로그인 해주세요!');
        navigate('/user/auth');
      } else {
        throw new Error(error.message);
      }
    }
  }, [error]);

  // 현재 날짜와 예약 날짜 비교 함수
  const filterReservations = (data: IResvRes | undefined) => {
    if (data) {
      return data.filter((item) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const reservationDate = new Date(item.date);
        reservationDate.setHours(0, 0, 0, 0);

        return reservationDate.getTime() >= today.getTime();
      });
    }

    return null;
  };

  useEffect(() => {
    if (data) {
      setFilteredData(filterReservations(data));
    }
  }, [data]);

  return (
    <>
      <Helmet>
        <title>마이페이지 | 터치즈</title>
        <meta property="og:title" content={'마이페이지 | 터치즈'} />
      </Helmet>
      <Header title="마이페이지" />
      <div css={MyInfoStyle}>
        <Link to="/user/profile">{username}님 환영해요!</Link>
        <p>{email}</p>
      </div>

      <div
        css={[
          ReservationCardSwiperStyle(Boolean(data && data?.length > 1)),
          DividerStyle,
          CustomDividerStyle,
        ]}
      >
        <Swiper
          className="mypageSwiper"
          modules={[Pagination]}
          centeredSlides={!isPc && true}
          spaceBetween={isPc ? 16 : 8}
          slidesPerGroup={isPc ? (filteredData && filteredData.length ? 3 : 1) : 1}
          slidesPerView={isPc ? (filteredData && filteredData.length ? 3 : 1) : 1.08}
          pagination={{
            clickable: true,
          }}
        >
          {(filteredData?.length ? sortReservations(filteredData) : [null]).map((item, i) => (
            <SwiperSlide key={`${item ? item.reservationId : i}`}>
              <ReservationCard isMyPage={pathname.includes('mypage')} data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ul css={MyPageMenuStyle}>
        <li className="history">
          <Link to="/reservation/list">예약내역</Link>
        </li>
        <li className="myreview">
          <Link to="/user/myReviews">내 리뷰</Link>
        </li>
        <li className="bookmarkstudio">
          <Link to="/user/bookmarks">찜한 사진관</Link>
        </li>
      </ul>
    </>
  );
};

export default MyPage;

const CustomDividerStyle = css`
  padding-bottom: 2.6rem;

  &::after {
    width: 100%;
  }

  ${mqMin(breakPoints.pc)} {
    padding-bottom: 4rem;
  }
`;

const MyInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.6rem 0;
  align-items: flex-start;
  ${mqMin(breakPoints.pc)} {
    padding: 4rem 0;
  }

  & a {
    ${TypoTitleMdSb}
    display: flex;
    gap: 0.4rem;
    align-items: center;

    &::after {
      content: '';
      width: 2.4rem;
      height: 2.4rem;
      background-image: url('/img/icon-chevronright.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 0.9rem 1.6rem;
    }
  }

  & p {
    ${TypoBodyMdR}
    color:${variables.colors.gray800}
  }
`;

const MyPageMenuStyle = css`
  & li {
    & a {
      ${TypoTitleXsR};
      padding: 1.6rem 0;
      border-bottom: 1px solid ${variables.colors.gray300};
      display: flex;
      gap: 1.6rem;
      align-items: center;

      &::after {
        content: '';
        width: 2.4rem;
        height: 2.4rem;
        background-image: url('/img/icon-chevronright.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 0.9rem 1.6rem;
        margin-left: auto;
      }

      &::before {
        content: '';
        width: 2.8rem;
        height: 2.8rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 2.6rem;
      }
    }
  }

  .history > a::before {
    background-image: url('/img/icon-calendar-yellow.svg');
  }
  .myreview > a::before {
    background-image: url('/img/icon-myreview.svg');
  }
  .bookmarkstudio > a::before {
    background-image: url('/img/icon-bookmark-active.svg');
  }
  .bookmarkstudio > a {
    border-bottom: none;
  }
`;

// const ReservationCardSwiperStyle = (data: boolean) => css`
//   box-shadow: inset 0 0 10px red;
//   width: calc(100% + calc(${variables.layoutPadding} * 2));
//   margin-left: calc(-1 * ${variables.layoutPadding});

//   ${mqMin(breakPoints.pc)} {
//     padding: 0 ${variables.layoutPadding};
//   }

//   .mypageSwiper {
//     padding-bottom: 1.6rem;

//     ${mqMin(breakPoints.pc)} {
//       padding-bottom: 4rem;
//     }
//   }

//   .mypageSwiper .swiper-wrapper {
//     ${mqMin(breakPoints.pc)} {
//       box-sizing: border-box;
//     }

//     ${data &&
//     ` padding-bottom: 1.6rem;
//     ${mqMin(breakPoints.pc)} {
//       padding-bottom: 2.4rem;
//     };`}
//   }

//   .mypageSwiper .swiper-pagination {
//     position: absolute;
//     z-index: 10;
//     width: 8rem;
//     bottom: 0;
//     left: 50%;
//     transform: translateX(-50%);
//     display: flex;
//     justify-content: center;
//     background-color: ${variables.colors.gray400};
//   }

//   .mypageSwiper .swiper-pagination-bullet {
//     width: 100%;
//     height: 0.2rem;
//     border-radius: 0;
//     margin: 0 !important;
//     cursor: pointer;
//   }

//   .mypageSwiper .swiper-pagination-bullet-active {
//     background-color: ${variables.colors.primary600};
//   }
// `;

const ReservationCardSwiperStyle = (data: boolean) => css`
  width: calc(100% + calc(${variables.layoutPadding} * 2));
  margin-left: calc(-1 * ${variables.layoutPadding});

  .mypageSwiper {
    position: relative;

    .swiper-wrapper {
      ${data && ` padding-bottom: 1.6rem;`}
    }

    .swiper-pagination {
      position: absolute;
      z-index: 10;
      width: 8rem;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      background-color: ${variables.colors.gray400};
    }

    .swiper-pagination-bullet {
      width: 100%;
      height: 0.2rem;
      border-radius: 0;
      margin: 0 !important;
      cursor: pointer;
    }

    .swiper-pagination-bullet-active {
      background-color: ${variables.colors.primary600};
    }
  }

  ${mqMin(breakPoints.pc)} {
    padding: 0 ${variables.layoutPadding};

    .mypageSwiper {
      .swiper-wrapper {
        ${data && ` padding-bottom: 2.4rem;`}
      }
    }
  }
`;
