/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoTitleXsB, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Theme = '전체' | '몽환' | '내추럴' | '러블리' | '시크' | '청순' | '상큼';

/** home 에서 사용되는 테마셀렉터 */
const ThemeNavigator = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>('전체');
  const themes: Theme[] = ['전체', '몽환', '내추럴', '러블리', '시크', '청순', '상큼'];
  const currentParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  // activeTheme가 변경될 때마다 쿼리 파라미터 업데이트
  useEffect(() => {
    if (activeTheme === '전체') {
      currentParams.delete('vibeName'); // '전체'일 때 vibeName 삭제
    } else {
      currentParams.set('vibeName', activeTheme);
    }
    navigate(`?${currentParams.toString()}`); // URL 업데이트
  }, [activeTheme]); // activeTheme가 변경될 때마다 실행

  return (
    <NavStyle>
      <ThemeListStyle>
        {themes.map((theme) => (
          <li key={theme}>
            <ThemeButtonStyle
              isActive={activeTheme === theme}
              css={activeTheme === theme ? TypoTitleXsB : TypoTitleXsM}
              onClick={() => setActiveTheme(theme)}
            >
              {theme}
            </ThemeButtonStyle>
          </li>
        ))}
      </ThemeListStyle>
    </NavStyle>
  );
};

export default ThemeNavigator;

const NavStyle = styled.nav`
  width: 100%;
  background-color: ${variables.colors.black};
  padding: 1.1rem 1rem;

  ${mqMin(breakPoints.pc)} {
    width: unset;
    margin: 0.3rem 0;
  }
`;

const ThemeListStyle = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  ${mqMin(breakPoints.pc)} {
    gap: 0.85rem;
    justify-content: center;
  }
`;

// ThemeNavigator test 코드와 연관되어 있음
const ThemeButtonStyle = styled.button<{ isActive: boolean }>`
  text-align: center;
  color: ${(props) =>
    props.isActive ? `${variables.colors.white}` : `${variables.colors.gray500}`};
  position: relative;
  padding: ${(props) => (props.isActive ? '0.3rem 0.9rem 0.3rem 0.8rem' : '0.3rem 0.4rem')};

  &::after {
    content: '';
    display: ${(props) => (props.isActive ? 'block' : 'none')};
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    background: url('/img/icon-nav-badge.svg') no-repeat center / contain;
    top: 0.3rem;
    right: 0.4rem;
  }
`;
