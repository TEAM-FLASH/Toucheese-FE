import styled from '@emotion/styled';
import { TypoBodyMdM } from '@styles/Common';
import variables from '@styles/Variables';

type LocationItem = string;

interface Props {
  selectedIndex: LocationItem | null;
  onChange: (selected: LocationItem) => void;
}

const locationList: LocationItem[] = [
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

const LocationSelector = ({ selectedIndex, onChange }: Props) => {
  return (
    <LocationBox>
      {locationList.map((v, i) => (
        <ListItem onClick={() => onChange(v)} isSelected={selectedIndex === v} key={i}>
          {v}
        </ListItem>
      ))}
    </LocationBox>
  );
};

export default LocationSelector;

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
