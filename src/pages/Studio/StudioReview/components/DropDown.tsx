/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

interface DropdownPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const Dropdown = ({ options, selectedOption, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    top: '100%',
    left: '0',
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  // 드롭다운 위치 계산
  useLayoutEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // 오른쪽으로 넘치는지 확인
      const rightOverflow = rect.right + rect.width > windowWidth;

      // 아래로 넘치는지 확인
      const bottomOverflow = rect.bottom + 200 > windowHeight; // 200은 대략적인 드롭다운 높이

      let position: DropdownPosition = { top: '100%', left: '0' };

      if (rightOverflow) {
        position.left = 'auto';
        position.right = '0';
      }

      if (bottomOverflow) {
        position.top = 'auto';
        position.bottom = '100%';
      }

      setDropdownPosition(position);
    }
  }, [isOpen]);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <FilterDropdown onClick={handleToggleDropdown}>
        <SelectedText>{selectedOption}</SelectedText>
        <DropdownIcon isOpen={isOpen}>
          <img src="/img/icon-arrowdown.svg" alt="드롭다운 화살표" />
        </DropdownIcon>
      </FilterDropdown>
      {isOpen && (
        <OptionList
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            right: dropdownPosition.right,
            bottom: dropdownPosition.bottom,
          }}
        >
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
  width: 70%;
  max-width: 623px;
  box-sizing: border-box;
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
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid ${variables.colors.gray400};
  border-radius: ${variables.borderRadius};
  margin-top: 0.4rem;
  z-index: 12;
  background-color: ${variables.colors.white};
  overflow: hidden;
  max-height: 20rem;
  overflow-y: auto;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: ${variables.colors.gray100};
  }

  &::-webkit-scrollbar-thumb {
    background: ${variables.colors.gray300};
    border-radius: 0.2rem;
  }
`;

const OptionItem = styled.li<{ isSelected: boolean }>`
  padding: 0.8rem 1rem;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? variables.colors.gray100 : '')};
  border-radius: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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
  box-sizing: border-box;
  overflow: hidden;
`;

const SelectedText = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
