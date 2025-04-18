/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ReservationFooter, {
  reservationFooterWrStyle,
} from '@components/ReservationFooter/ReservationFooter';
import ImageSwiper from '@components/Swiper/ImageSwiper';
import { css } from '@emotion/react';
import useToast from '@hooks/useToast';
import useReservationStore from '@store/useReservationStore';
import { defaultUserState } from '@store/useUserStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { getLocalStorageItem } from '@utils/getLocalStorageItem';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IMenuListRes, IPortfolio, IUser } from 'types/types';
import { MenuPCStyle } from './StudioMenu';
import StudioMenuDetailInfo from './StudioMenuDetailInfo';
import StudioMenuDetailReview from './StudioMenuDetailReview';

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
  const openToast = useToast();

  const fetchMenuDetail = async () => {
    const res = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/menu/${_menuId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch data');

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
      navigate(`/studio/${_id}/reservation`);
    } else {
      openToast('로그인이 필요합니다!');
      window.sessionStorage.setItem('lastPage', pathname);
      navigate('/user/auth');
    }
  };

  //메뉴 이미지가 존재하지 않을 경우 기본 이미지 데이터
  const menuImgNopic: IPortfolio[] = [
    {
      id: 1,
      studio: 'nopic-menu-img',
      vibe: 'nnopic-menu-imgopic',
      name: 'nopic-menu-img',
      url: '/img/img-menu-nopic.png',
      menuId: null,
      menuName: null,
      description: 'nopic-menu-img',
      created_at: null,
      updated_at: null,
    },
  ];

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

      <div css={MenuPCStyle}>
        <Header
          title={`${scrollY ? data?.name : ''}`}
          backTo={`/studio/${_id}/menu`}
          fixed={true}
          scrollEvent={true}
        />
      </div>

      <div css={[MenuLayoutPCStyle]}>
        {data && (
          <div css={MenuCoverStyle}>
            <ImageSwiper
              images={data && data?.menuImages.length > 0 ? data?.menuImages : menuImgNopic}
              slidesPerView={1}
              spaceBetween={0}
              imageStyle={MenuImgPCStyle}
            />
          </div>
        )}

        <div css={reservationFooterWrStyle}>
          <div css={MenuInfoPCStyle} className="content-box">
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
          </div>

          <ReservationFooter text="예약하기" type="button" onClick={handleReservartionNext} />
        </div>
      </div>
    </>
  );
};

export default StudioMenuDetail;

const MenuLayoutPCStyle = css`
  ${mqMin(breakPoints.pc)} {
    width: 100vw;
    position: relative;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 3.5rem;
  }
`;

const MenuInfoPCStyle = css`
  ${mqMin(breakPoints.pc)} {
    padding: 5rem 2.4rem;
    flex-grow: 1;
  }
`;

const MenuCoverStyle = css`
  ${mqMin(breakPoints.pc)} {
    position: sticky;
    left: 0;
    top: 8rem;
    width: 50.9rem;
    height: 64rem;
    z-index: 10;
  }
`;
const MenuImgPCStyle = css`
  ${mqMin(breakPoints.pc)} {
    width: 100%;
    height: 64rem;
    object-fit: contain;
  }
`;

const MenuDescStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.8rem 0;

  ${mqMin(breakPoints.pc)} {
    padding: 0 0 3.4rem;
  }

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
  z-index: 100;
  color: ${variables.colors.gray800};
  display: flex;
  text-align: center;
  background-color: ${variables.colors.white};
  width: calc(100% + calc(${variables.layoutPadding} * 2));
  margin-left: calc(-1 * ${variables.layoutPadding});
  padding: 0 ${variables.layoutPadding};
  box-sizing: border-box;

  ${mqMin(breakPoints.pc)} {
    top: -5rem;
    width: calc(100% + (${variables.layoutPadding} * 2));
  }

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
