/** @jsxImportSource @emotion/react */
import CopyLocation from '@components/CopyButton/CopyLocation';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  addressSi: string;
  addressGu: string;
  address: string;
}

const KakaoMap = ({ addressSi, addressGu, address }: KakaoMapProps) => {
  const apiKey = import.meta.env.VITE_KAKAO_API_KEY;

  const [loading, error] = useKakaoLoader({
    appkey: apiKey,
    libraries: ['services'],
  });

  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const fullAddress = `${addressSi} ${addressGu} ${address}`;

  useEffect(() => {
    if (loading || error || !window.kakao || !fullAddress) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(fullAddress, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        setPosition({ lat: parseFloat(y), lng: parseFloat(x) });
      }
    });
  }, [loading, error, fullAddress]);

  const handleMapClick = () => {
    const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(fullAddress)}`;
    window.open(kakaoMapUrl, '_blank');
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div css={mapContainerStyle}>
        <Map center={position} css={mapStyle} level={3} zoomable={true} isPanto={true}>
          <MapMarker
            position={position}
            image={{
              src: '/img/icon-map-pin.svg',
              size: { width: 40, height: 54 },
              options: { alt: '지도 마커 아이콘' },
            }}
          />
        </Map>
        <button css={viewMapButtonStyle} onClick={handleMapClick}>
          지도보기
        </button>
      </div>
      <CopyLocation text={fullAddress} buttonLabel="주소복사" />
    </>
  );
};

export default KakaoMap;

const mapContainerStyle = css`
  position: relative;
  width: 100%;
  height: 70vh;
`;

const viewMapButtonStyle = css`
  position: absolute;
  bottom: 1.6rem;
  right: 1.6rem;
  z-index: 1;
  padding: 0.4rem 1rem;
  font-size: 1.1rem;
  color: ${variables.colors.white};
  background-color: ${variables.colors.gray800};
  border-radius: 0.4rem;
  cursor: pointer;
  opacity: 0.9;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${variables.colors.gray900};
  }
`;

const mapStyle = css`
  width: 100%;
  height: 100%;
`;

{
  /* <KakaoMap
addressSi={studioData.addressSi}
addressGu={studioData.addressGu}
address={studioData.address}
/> */
}
