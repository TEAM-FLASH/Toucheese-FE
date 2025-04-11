/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import styled from '@emotion/styled';
import { ReservationOption } from '@store/useReservationStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import {
  PCLayout,
  TypoBodyMdM,
  TypoBodyMdR,
  TypoBodyMdSb,
  TypoBodySmR,
  TypoTitleMdSb,
  TypoTitleXsM,
} from '@styles/Common';
import variables from '@styles/Variables';
import { useNavigate } from 'react-router-dom';

interface IStepStyle {
  type: 'active' | 'inactive';
}

interface IData {
  id: number;
  studio: string | undefined;
  reservedMenu: string | undefined;
  reservedDateTime: string | null;
  options: ReservationOption[];
}

const CompleteMessage = ({
  type,
  data,
  resetInfo,
}: {
  type: 'reserved' | 'canceled';
  data: IData;
  resetInfo: () => void;
}) => {
  const navigate = useNavigate();

  const reservedOptions = data.options.map((option, index) => (
    <p key={index} css={TypoBodySmR} className="content-item-options">
      {option.optionName}
    </p>
  ));

  return (
    <>
      <SectionStyle>
        <MessageStyle>
          <h2 css={TypoTitleMdSb}>예약이 {type === 'reserved' ? '신청' : '취소'}되었습니다.</h2>
          {type === 'reserved' ? (
            <p css={TypoBodyMdR}>
              매장에서 예약 가능 여부를 확인중이에요.
              <br />
              예약이 확정되면 <span>카카오톡</span>을 통해 안내드릴게요.
            </p>
          ) : (
            <p css={TypoBodyMdR}>
              예약이 성공적으로 취소되었습니다.
              <br />
              다음번에 다시 뵙기를 기대합니다!
            </p>
          )}
        </MessageStyle>
        {type === 'reserved' && (
          <ProgressStyle aria-label="예약 진행 상황">
            <StepStyle type="active">
              <div className="first">
                <span css={TypoTitleXsM}>1</span>
              </div>
              <p>예약 신청</p>
            </StepStyle>
            <StepStyle type="active">
              <div>
                <span css={TypoTitleXsM}>2</span>
              </div>
              <p>매장 확인중</p>
            </StepStyle>
            <StepStyle type="inactive">
              <div className="last">
                <span css={TypoTitleXsM}>3</span>
              </div>
              <p>예약 확정</p>
            </StepStyle>
          </ProgressStyle>
        )}
        <ReservationInfoStyle>
          <div className="title-style">
            <h3 css={TypoBodyMdSb}>예약 {type === 'canceled' && '취소'} 정보</h3>
          </div>

          <div className="content-style">
            <div className="content-item">
              <p css={TypoBodyMdM} className="content-item-title">
                매장명
              </p>
              <div css={TypoBodyMdR} className="content-item-desc">
                <p>{data.studio}</p>
              </div>
            </div>
            <div className="content-item">
              <p css={TypoBodyMdM} className="content-item-title">
                일정
              </p>
              <div css={TypoBodyMdR} className="content-item-desc schedule">
                <p>{data.reservedDateTime}</p>
              </div>
            </div>
            <div className="content-item">
              <p css={TypoBodyMdM} className="content-item-title">
                메뉴
              </p>

              <div css={TypoBodyMdR} className="content-item-desc menu">
                <p>{data.reservedMenu}</p>
                <div className="content-item-extra">{reservedOptions}</div>
              </div>
            </div>
          </div>
        </ReservationInfoStyle>
      </SectionStyle>
      <FooterButtonStyle>
        <Button
          text={type === 'reserved' ? '예약 상세' : '취소 상세'}
          variant="gray"
          active={true}
          onClick={() => {
            resetInfo();
            navigate(`/reservation/${data.id}`, { replace: true });
          }}
        />
        <Button
          text="홈으로"
          variant="black"
          active={true}
          onClick={() => {
            resetInfo();
            navigate('/', { replace: true });
          }}
        />
      </FooterButtonStyle>
    </>
  );
};

const SectionStyle = styled.section`
  margin-top: 3.2rem;
  padding-bottom: 10.6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    padding: 0 32.8rem;
    margin-top: 6.5rem;
    margin-bottom: 2.4rem;
    gap: 2.4rem;
  }
`;

const MessageStyle = styled.div`
  text-align: center;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 3.6rem;
    aspect-ratio: 1/1;
    margin: 0 auto;
    margin-bottom: 2rem;
    background: url('/img/icon-complete-cheese500.svg') no-repeat;
    background-size: contain;
    background-position: center;
  }

  & > h2 {
    margin-bottom: 2rem;
  }

  & > p {
    color: ${variables.colors.gray800};

    & > span {
      color: ${variables.colors.black};
    }
  }

  ${mqMin(breakPoints.pc)} {
    &::before {
      margin-bottom: 2.4rem;
    }

    & > h2 {
      margin-bottom: 2.4rem;
    }
  }
`;

const ProgressStyle = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: calc(100% - 3rem);
    height: 0.4rem;
    background-color: ${variables.colors.gray400};
    top: 1.4rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: -2;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: calc(100% - 3rem);
    height: 0.4rem;
    background-color: ${variables.colors.primary500};
    top: 1.4rem;
    left: 50%;
    transform: translateX(-75%) scaleX(0.5);
    z-index: -1;
  }

  ${mqMin(breakPoints.pc)} {
    margin: 0 12rem;
  }
`;

const StepStyle = styled.li<IStepStyle>`
  text-align: center;

  & > div {
    margin: 0 auto;
    margin-bottom: 0.6rem;
    width: 3.2rem;
    height: 3.2rem;
    background-color: ${(props) =>
      props.type === 'active' ? variables.colors.primary500 : variables.colors.gray400};
    color: ${variables.colors.white};
    border-radius: 50%;
    border: 0.4rem solid ${variables.colors.white};
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > p {
    color: ${(props) =>
      props.type === 'active' ? variables.colors.primary800 : variables.colors.black};
  }
`;

const ReservationInfoStyle = styled.div`
  padding: ${variables.layoutPadding};
  background-color: ${variables.colors.gray100};
  border-radius: 0.8rem;

  & > .title-style {
    display: flex;
    gap: 0.8rem;
    align-items: center;
    margin-bottom: 1rem;

    &::before {
      content: '';
      width: 1.6rem;
      height: 1.6rem;
      background: url('/img/icon-calendar-black.svg') no-repeat;
      background-position: center;
      background-size: 1.2rem 1.3rem;
    }
  }

  & > .content-style {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    & > .content-item {
      display: flex;
      gap: 2.4rem;

      & > .content-item-title {
        flex-shrink: 0;
        width: 3.7rem;
        color: ${variables.colors.gray700};
      }

      & > .content-item-desc {
        flex-grow: 1;

        &.schedule {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        &.menu {
          & > .content-item-extra {
            margin-top: 0.4rem;
            display: flex;
            flex-wrap: wrap;
            row-gap: 0.2rem;

            & > .content-item-options {
              margin-right: 0.6rem;
              display: flex;
              align-items: center;
              gap: 0.6rem;

              &::after {
                content: '';
                width: 0.1rem;
                height: 1rem;
                background-color: ${variables.colors.gray400};
              }

              &:last-child::after {
                content: none;
              }
            }
          }
        }
      }
    }
  }
`;

const FooterButtonStyle = styled.div`
  box-shadow: inset 0 0 10px blue;
  z-index: 9;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: inset 0 0.1rem ${variables.colors.gray300};
  padding: 1.8rem ${variables.layoutPadding} 3rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::before {
    content: '';
    background-color: rgba(255, 255, 255, 0.3);
    height: 1rem;
    position: absolute;
    top: -1rem;
    left: 0;
    right: 0;
  }

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    padding: 0 32.8rem;
    margin-bottom: 5.3rem;
    box-shadow: inset 0 0 10px red;
    z-index: unset;
    position: unset;
    box-shadow: unset;
    gap: 1.6rem;
  }
`;

export default CompleteMessage;
