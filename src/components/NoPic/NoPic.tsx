/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdM, TypoTitleXsR } from '@styles/Common';
import variables from '@styles/Variables';

const NoPic = () => {
  return (
    <DivStyle>
      <p>멋진 사진을 준비 중입니다. 기대해 주세요!</p>
    </DivStyle>
  );
};

const DivStyle = styled.div`
  width: 100%;
  height: 11.8rem;
  padding: 0 2.141rem 0 ${variables.layoutPadding};
  background-color: ${variables.colors.gray200};
  display: flex;
  overflow: hidden;

  & p {
    flex-grow: 1;
    flex-shrink: 0;
    max-width: 18rem;

    color: ${variables.colors.gray700};
    margin: auto 0;
    ${TypoBodyMdM}
  }

  &::after {
    content: '';
    width: 9.752rem;
    height: 9.494rem;
    background: url('/img/icon-nopic-mo.svg') no-repeat center / contain;
    margin-top: auto;
    margin-bottom: -0.255rem;
    margin-left: auto;
  }

  ${mqMin(breakPoints.pc)} {
    height: 17.6rem;
    padding: ${variables.layoutPadding};
    flex-direction: column-reverse;
    gap: 1.4rem;

    & p {
      flex-grow: unset;
      max-width: unset;
      margin: unset;
      ${TypoTitleXsR}
      color: ${variables.colors.gray600};
    }

    &::after {
      content: '';
      width: 26.5rem;
      height: 7.6rem;
      background: url('/img/icon-nopic-pc.svg') no-repeat center / 100%;
      margin: 1.4rem 0 0 0.3rem;
    }
  }
`;

export default NoPic;
