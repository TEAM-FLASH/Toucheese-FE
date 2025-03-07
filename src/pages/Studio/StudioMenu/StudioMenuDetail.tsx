/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import Header from '@components/Header/Header';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TypoBodyMdM, TypoTitleSmS } from '@styles/Common';
import StudioMenuDetailInfo from './StudioMenuDetailInfo';
import { useEffect, useState } from 'react';
import StudioMenuDetailReview from './StudioMenuDetailReview';
import { IMenuListRes, IUser } from 'types/types';
import ReservationFooter from '@components/ReservationFooter/ReservationFooter';
import ImageSwiper from '@components/Swiper/ImageSwiper';
import useReservationStore from '@store/useReservationStore';
import { Helmet } from 'react-helmet-async';
import { defaultUserState } from '@store/useUserStore';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';

const StudioMenuDetail = () => {
  const { _menuId, _id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<IMenuListRes>();
  const [scrollY, setScrollY] = useState(false);
  const [tabMenuState, setTabMenuState] = useState('info');
  const setBasicReservation = useReservationStore((state) => state.setBasicReservation);
  const saveReservationDetails = useReservationStore((state) => state.saveReservationDetails);
  const { totalPrice, options, menuId } = useReservationStore();
  const { accessToken: user } = getLocalStorageItem<IUser>('userState', defaultUserState);
  const { pathname } = useLocation();

  const fetchMenuDetail = async () => {
    const res = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/menu/${_menuId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error('Failed to fetch data');
    }

    const data = await res.json();

    return data;
  };

  useEffect(() => {
    const fetchAndSetData = async () => {
      const result = await fetchMenuDetail();
      setData(result);
      if (menuId !== result.id) {
        setBasicReservation(result.price, result.id);
      }
    };

    fetchAndSetData();
  }, [_menuId]);

  const handleScroll = () => {
    if (window.scrollY >= 250) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleReservartionNext = () => {
    const saveData = {
      menuId: data?.id,
      studioName: data?.studioName,
      menuName: data?.name,
      menuImage: data?.menuImages[0].url,
      basicPrice: data?.price,
      totalPrice,
      options,
    };
    saveReservationDetails(saveData);

    if (user) {
      window.sessionStorage.removeItem('lastPage');
      navigate(`/studio/${_id}/reservation`);
    } else {
      window.sessionStorage.setItem('lastPage', pathname);
      navigate('/user/auth');
    }
  };

  return (
    <>
      {data && (
        <Helmet>
          <title>
            {data?.studioName} - {data.name}
          </title>
          <meta property="og:title" content={`${data?.studioName} - ${data.name}`} />
          <meta property="og:url" content={`${window.location.href}`} />
          <meta
            property="og:description"
            content={`스튜디오 메뉴에 대한 상세 설명과 ${data?.reviews.content}개의 리뷰를 제공하는 페이지입니다.`}
          />
        </Helmet>
      )}

      <Header
        customStyle={HeaderCustomStyle(scrollY)}
        title={`${scrollY ? data?.name : ''}`}
        backTo={`/studio/${_id}/menu`}
      />
      {data && <ImageSwiper images={data.menuImages} slidesPerView={1} spaceBetween={0} />}
      <div css={MenuDescStyle}>
        <h2>{data?.name}</h2>
        <p>{data?.description}</p>
      </div>

      <ul css={TabMenuStyle}>
        <li
          onClick={() => setTabMenuState('info')}
          className={`${tabMenuState === 'info' && 'active'}`}
        >
          정보
        </li>
        <li
          onClick={() => setTabMenuState('review')}
          className={`${tabMenuState === 'review' && 'active'}`}
        >
          리뷰 {data?.reviewCount ? data?.reviewCount : '0'}
        </li>
      </ul>
      {data && tabMenuState === 'info' && <StudioMenuDetailInfo infoItem={data} />}
      {data && tabMenuState === 'review' && (
        <StudioMenuDetailReview reviewItem={data?.reviews.content} rating={data?.avgScore} />
      )}

      <ReservationFooter text="예약하기" type="button" onClick={handleReservartionNext} />
    </>
  );
};

export default StudioMenuDetail;

const HeaderCustomStyle = (scrollY: boolean) => css`
  transition: all 0.2s;
  ${scrollY && 'background-color: #fff; box-shadow: 0 0.4rem .5rem rgba(0, 0, 0, 0.1);'};
`;

const MenuDescStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.8rem 0;

  & h2 {
    ${TypoTitleSmS}
  }

  & p {
    ${TypoBodyMdM};
    color: ${variables.colors.gray800};
  }
`;

const TabMenuStyle = css`
  position: sticky;
  top: 5.5rem;
  left: 0;
  right: 0;
  z-index: 100;
  color: ${variables.colors.gray800};
  display: flex;
  text-align: center;
  background-color: ${variables.colors.white};
  width: calc(100% + 3.2rem);
  margin: 0 calc(-1 * ${variables.layoutPadding});
  margin-left: -1.6rem;
  padding: 0 ${variables.layoutPadding};

  & li {
    cursor: pointer;
    ${TypoBodyMdM};
    position: relative;
    padding: 1rem 0;
    text-align: center;
    flex-grow: 1;
    transition: all 0.3s;

    &::before {
      content: '';
      position: absolute;
      background-color: ${variables.colors.gray300};
      height: 0.2rem;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &.active {
      color: ${variables.colors.black};
    }

    &.active::before {
      background-color: ${variables.colors.black};
    }
  }
`;
