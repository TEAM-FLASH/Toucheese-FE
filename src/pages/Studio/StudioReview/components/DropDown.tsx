/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useState } from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const Dropdown = ({ options, selectedOption, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <FilterDropdown onClick={handleToggleDropdown}>
        <SelectedText>{selectedOption}</SelectedText>
        <DropdownIcon isOpen={isOpen}>
          <img src="/img/icon-arrowdown.svg" alt="드롭다운 화살표" />
        </DropdownIcon>
      </FilterDropdown>
      {isOpen && (
        <OptionList>
          {options.map((option) => (
            <OptionItem
              key={option}
              onClick={() => handleSelectOption(option)}
              isSelected={option === selectedOption}
            >
              {option}
            </OptionItem>
          ))}
        </OptionList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownIcon = styled.span<{ isOpen: boolean }>`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease-in-out;
  width: 1.2rem;
  height: 0.7rem;
`;

const OptionList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${variables.colors.gray400};
  border-radius: ${variables.borderRadius};
  margin-top: 0.4rem;
  z-index: 12;
  background-color: ${variables.colors.white};
`;

const OptionItem = styled.li<{ isSelected: boolean }>`
  padding: 0.8rem 1rem;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? variables.colors.gray100 : '')};
  border-radius: 0.8rem;

  &:hover {
    background-color: ${variables.colors.gray100};
  }
`;

const FilterDropdown = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.3rem;
  padding: 0.8rem 1rem;
  border: 1px solid ${variables.colors.gray400};
  border-radius: ${variables.borderRadius};
`;

const SelectedText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
