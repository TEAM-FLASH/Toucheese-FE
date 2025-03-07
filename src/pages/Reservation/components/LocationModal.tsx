/** @jsxImportSource @emotion/react */
import KakaoMap from '@components/Kakao/KakaoMap';
import Modal from '@components/Modal/Modal';
import { useGetStudioDetail } from '@hooks/useGetStudioDetail';

interface LocationModalProps {
  id: string;
  modalId: number;
}

const LocationModal = ({ id, modalId }: LocationModalProps) => {
  const { data } = useGetStudioDetail(id);

  if (!data) return null;

  return (
    <Modal type="fullscreen" title={`지도 (modal id: ${modalId})`} withBtn={false}>
      <KakaoMap addressSi={data.addressSi} addressGu={data.addressGu} address={data.address} />
    </Modal>
  );
};

export default LocationModal;
