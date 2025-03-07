/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { css } from '@emotion/react';
import { defaultUserState, useUserStore } from '@store/useUserStore';
import { DividerStyle, TypoBodyMdR, TypoTitleMdSb, TypoTitleXsR } from '@styles/Common';
import variables from '@styles/Variables';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IUser } from 'types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useGetReservationList } from '@hooks/useGetReservationList';

const MyPage = () => {
  const { username, email } = getLocalStorageItem<IUser>('userState', defaultUserState);
  const { pathname } = useLocation();

  const { data } = useGetReservationList('RESERVED');

  // 임시 로그아웃
  const logout = useUserStore((state) => state.resetUser);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
    <>
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
          centeredSlides={true}
          spaceBetween={10}
          slidesPerView={1.08}
          pagination={{
            clickable: true,
          }}
        >
          {(data?.length ? data : [null]).map((item, i) => (
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

      <button type="button" onClick={handleClick}>
        로그아웃
      </button>
    </>
  );
};

export default MyPage;

const CustomDividerStyle = css`
  &::after {
    width: 100%;
    max-width: calc(100vw + (${variables.layoutPadding} * 2));
  }
`;

const MyInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.6rem 0;
  align-items: flex-start;
  margin-top: 5.4rem;

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
      border-bottom: 0.1rem solid ${variables.colors.gray300};
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

const ReservationCardSwiperStyle = (data: boolean) => css`
  width: 100vw;
  margin-left: calc(-1 * ${variables.layoutPadding});

  .mypageSwiper .swiper-wrapper {
    ${data && `padding-bottom: 1.6rem;`};
  }

  .mypageSwiper .swiper-pagination {
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

  .mypageSwiper .swiper-pagination-bullet {
    width: 100%;
    height: 0.2rem;
    border-radius: 0;
    margin: 0 !important;
    cursor: pointer;
  }

  .mypageSwiper .swiper-pagination-bullet-active {
    background-color: ${variables.colors.primary600};
  }
`;
