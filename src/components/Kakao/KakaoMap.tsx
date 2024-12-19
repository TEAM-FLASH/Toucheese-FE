/** @jsxImportSource @emotion/react */
import CopyLocation from '@components/CopyButton/CopyLocation';
import { css } from '@emotion/react';
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

  const [isSearching, setIsSearching] = useState(true);

  const fullAddress = `${addressSi} ${addressGu} ${address}`;

  useEffect(() => {
    if (loading || error || !window.kakao || !fullAddress) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(fullAddress, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        setPosition({ lat: parseFloat(y), lng: parseFloat(x) });
      }
      setIsSearching(false);
    });
  }, [loading, error, fullAddress]);

  const handleMapClick = () => {
    const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(fullAddress)}`;
    window.open(naverMapUrl, '_blank');
  };

  if (loading || isSearching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading Kakao Map SDK: {error.message}</div>;
  }

  return (
    <>
      <div css={mapContainerStyle}>
        <Map center={position} css={mapStyle} level={3} zoomable={true} isPanto={true} onClick={handleMapClick}>
          <MapMarker
            position={position}
            image={{
              src: '/img/icon-map-pin.svg',
              size: { width: 40, height: 54 },
              options: { alt: '지도 마커 아이콘' },
            }}
          />
        </Map>
      </div>
      <CopyLocation text={fullAddress} buttonLabel="주소복사" />
    </>
  );
};

export default KakaoMap;

const mapContainerStyle = css`
  width: 100%;
  aspect-ratio: 16 / 9;
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
