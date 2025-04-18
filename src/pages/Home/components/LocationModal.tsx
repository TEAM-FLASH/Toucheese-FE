/** @jsxImportSource @emotion/react */
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/useModal';
import LocationSelector from './LocationSelector';
import { useState } from 'react';

type LocationItem = string;

const LocationModal = ({
  setSelectedLocation,
  initialSelectedLocation,
}: {
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocationItem | null>>;
  initialSelectedLocation: LocationItem | null;
}) => {
  const modal = useModal(3);
  const [selectedIndex, setSelectedIndex] = useState<LocationItem | null>(initialSelectedLocation);

  const dateLocationButtons = [
    {
      text: '초기화',
      event: () => {
        setSelectedIndex('서울전체');
        setSelectedLocation('서울전체');
      },
      variant: 'lightGray' as 'lightGray',
      width: 'fit' as 'fit',
      active: false,
    },
    {
      text: '적용하기',
      event: () => {
        if (selectedIndex) {
          setSelectedLocation(selectedIndex === '서울전체' ? selectedIndex : `${selectedIndex}구`);
          modal.close();
        }
      },
    },
  ];

  return (
    <Modal
      buttons={dateLocationButtons}
      modalId={3}
      title="지역 선택"
      isCloseBtn={true}
      type="fullscreen"
    >
      <LocationSelector selectedIndex={selectedIndex} onChange={setSelectedIndex} />
    </Modal>
  );
};

export default LocationModal;
