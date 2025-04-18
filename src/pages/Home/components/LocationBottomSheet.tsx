import useBottomSheetState from '@store/useBottomSheetStateStore';
import LocationSelector from './LocationSelector';
import { useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import styled from '@emotion/styled';

type LocationItem = string;

const LocationBottomSheet = ({
  setSelectedLocation,
  initialSelectedLocation,
}: {
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocationItem | null>>;
  initialSelectedLocation: LocationItem | null;
}) => {
  const { closeBottomSheet } = useBottomSheetState();
  const [selectedIndex, setSelectedIndex] = useState<LocationItem | null>(initialSelectedLocation);

  useEffect(() => {
    if (initialSelectedLocation) {
      const normalized = initialSelectedLocation.replace('구', '');
      setSelectedIndex(normalized);
    } else {
      setSelectedIndex(null);
    }
  }, [initialSelectedLocation]);

  const handleReset = () => {
    setSelectedIndex('서울전체');
    setSelectedLocation('서울전체');
  };

  const handleApply = () => {
    if (selectedIndex) {
      setSelectedLocation(selectedIndex === '서울전체' ? selectedIndex : `${selectedIndex}구`);
      closeBottomSheet();
    }
  };

  return (
    <BottomSheetBox>
      <LocationSelector selectedIndex={selectedIndex} onChange={setSelectedIndex} />

      <ButtonBoxStyle>
        <Button
          type="button"
          width="fit"
          variant="lightGray"
          active={false}
          text="초기화"
          onClick={handleReset}
        />
        <Button type="button" width="max" variant="black" text="적용하기" onClick={handleApply} />
      </ButtonBoxStyle>
    </BottomSheetBox>
  );
};

export default LocationBottomSheet;

const BottomSheetBox = styled.div`
  z-index: 99999;
`;

const ButtonBoxStyle = styled.div`
  display: flex;
  gap: 0.8rem;
`;
