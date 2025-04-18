/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { NavLink, useLocation } from 'react-router-dom';

const StudioNavigator = ({ _id, type = 'mobileOnly' }: { _id: string; type?: string }) => {
  const location = useLocation();

  // URL에서 "/studio/{id}/menu"와 같은 경로 추출
  const pathSegments = location.pathname.split('/'); // 경로를 '/'로 분리
  const currentLocation = pathSegments[pathSegments.length - 1];

  return (
    <NavStyle type={type}>
      <UlStyle>
        <LiStyle>
          <NavLinkStyle
            to={`/studio/${_id}`}
            className={({ isActive }) => (isActive ? 'active' : '')}
            replace
            end
          >
            <span css={TypoTitleXsM}>홈</span>
          </NavLinkStyle>
        </LiStyle>
        <LiStyle>
          <NavLinkStyle
            to={`/studio/${_id}/menu`}
            className={({ isActive }) => (isActive ? 'active' : '')}
            replace={isNaN(Number(currentLocation))}
          >
            <span css={TypoTitleXsM}>메뉴</span>
          </NavLinkStyle>
        </LiStyle>
        <LiStyle>
          <NavLinkStyle
            to={`/studio/${_id}/portfolio`}
            className={({ isActive }) => (isActive ? 'active' : '')}
            // 숫자로 바꿨을 때 NaN이면 replace
            replace={isNaN(Number(currentLocation))}
          >
            <span css={TypoTitleXsM}>포트폴리오</span>
          </NavLinkStyle>
        </LiStyle>
        <LiStyle>
          <NavLinkStyle
            to={`/studio/${_id}/review`}
            className={({ isActive }) => (isActive ? 'active' : '')}
            replace={isNaN(Number(currentLocation))}
          >
            <span css={TypoTitleXsM}>리뷰</span>
          </NavLinkStyle>
        </LiStyle>
      </UlStyle>
    </NavStyle>
  );
};

const NavStyle = styled.nav<{ type: string }>`
  position: sticky;
  top: 5.6rem;
  width: calc(100% + 3.2rem);
  margin: 0 calc(-1 * ${variables.layoutPadding});
  margin-left: -1.6rem;
  background-color: white;
  z-index: 5;

  ${mqMin(breakPoints.pc)} {
    display: ${({ type }) => type === 'mobileOnly' && 'none'};
    width: 36rem;
    margin: unset;
    padding: unset;
  }
`;

const UlStyle = styled.ul`
  display: flex;
`;

const LiStyle = styled.li`
  width: 25%;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
`;

const NavLinkStyle = styled(NavLink)`
  position: relative;
  display: block;
  width: 100%;
  padding: 1rem 0;
  text-align: center;
  color: ${variables.colors.gray600};

  ${mqMin(breakPoints.pc)} {
    padding: 1.7rem 0;
  }

  & > span {
    display: inline-block;
    position: relative;
  }

  &::before {
    content: '';
    position: absolute;
    background-color: ${variables.colors.gray300};
    height: 0.1rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &.active {
    color: ${variables.colors.black};
  }

  &.active::before {
    content: '';
    position: absolute;
    background-color: ${variables.colors.black};
    height: 0.2rem;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &.active > span::after {
    content: '';
    position: absolute;
    right: -0.55rem;
    top: 0rem;
    width: 0.6rem;
    height: 0.6rem;
    background: url('/img/icon-nav-badge.svg') no-repeat center / contain;
  }
`;

export default StudioNavigator;
