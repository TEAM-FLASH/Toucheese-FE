import { TypoBodyMdM } from '@styles/Common';
import styled from '@emotion/styled';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import { useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import variables from '@styles/Variables';

type LocationItem = string;

const LocationBottomSheet = ({
  setSelectedLocation,
  initialSelectedLocation,
}: {
  setSelectedLocation: React.Dispatch<React.SetStateAction<LocationItem | null>>;
  initialSelectedLocation: LocationItem | null;
}) => {
  const LocationItem: LocationItem[] = [
    '서울전체',
    '강남',
    '서초',
    '송파',
    '강서',
    '마포',
    '영등포',
    '강북',
    '용산',
    '성동',
  ];
  const { closeBottomSheet } = useBottomSheetState();
  const [selectedIndex, setSelectedIndex] = useState<LocationItem | null>(null);

  useEffect(() => {
    setSelectedIndex(initialSelectedLocation);
  }, [initialSelectedLocation]);

  const handleClick = (item: string) => {
    setSelectedIndex(item);
  };

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
    <>
      <LocationBox>
        {LocationItem.map((v, i) => (
          <ListItem onClick={() => handleClick(v)} isSelected={selectedIndex === v} key={i}>
            {v}
          </ListItem>
        ))}
      </LocationBox>
      <ButtonBox>
        <Button text="초기화" width="fit" variant="gray" onClick={handleReset} />
        <Button text="적용하기" variant="black" onClick={handleApply} />
      </ButtonBox>
    </>
  );
};

export default LocationBottomSheet;

const ButtonBox = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const LocationBox = styled.section`
  margin-bottom: 3.2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0.8rem;
`;

const ListItem = styled.button<{ isSelected: boolean }>`
  ${TypoBodyMdM}
  cursor: pointer;
  border: 0.1rem solid ${variables.colors.gray400};
  height: 5.6rem;
  padding: 0 2rem;
  text-align: center;
  border-radius: 1rem;

  ${(props) =>
    props.isSelected &&
    `
    background-color: ${variables.colors.primary50};
      border: 0.1rem solid ${variables.colors.primary600};
  `}
`;
