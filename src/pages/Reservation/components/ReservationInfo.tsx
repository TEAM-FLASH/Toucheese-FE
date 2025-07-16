/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import useReservationStore from '@store/useReservationStore';
import { changeformatDateForUi, useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { TypoBodySmR, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import {
  reservationBoxStyle,
  reservationHrStyle,
  reservationTitleAlignStyle,
} from '../ReservationCheck';
import { breakPoints, mqMax, mqMin } from '@styles/BreakPoint';

const ReservationInfo = () => {
  const { studioName, options, menuName, menuImage } = useReservationStore();
  const { time } = useSelectTimeStore();
  const { date } = useSelectDateStore();

  return (
    <section css={reservationInfoStyle}>
      <h2 css={[reservationTitleAlignStyle, firstTitleAlignStyle]}>예약정보</h2>

      <div css={reservationBoxStyle}>
        <dl>
          <dt>사진관 이름</dt>
          <dd>
            <h3 data-testid="studioName" css={studioNameStyle}>
              {studioName}
            </h3>
          </dd>
          <dt css={marginTop}>예약 일시</dt>
          <dd>
            <h3 css={TypoTitleXsM}>{changeformatDateForUi({ date, time })}</h3>
          </dd>
        </dl>

        <hr css={reservationHrStyle} />

        <div css={flexRow}>
          <dl>
            <dt>예약 촬영</dt>
            <dd>
              <h3 css={TypoTitleXsM}>{menuName}</h3>
            </dd>
            {options.length > 0 && (
              <>
                <dt css={marginTop}>추가 옵션</dt>
                <dd>
                  <h3 css={textWrapperStyle}>
                    {options.map((option) => (
                      <span key={option.option_id}>{option.optionName}</span>
                    ))}
                  </h3>
                </dd>
              </>
            )}
          </dl>
          <img src={menuImage} alt="포트폴리오 이미지" css={imgStyle} />
        </div>
      </div>
    </section>
  );
};

export default ReservationInfo;

const studioNameStyle = css`
  ${mqMax(breakPoints.moMax)} {
    color: ${variables.colors.gray800};
    font-size: 1.2rem;
  }

  ${mqMin(breakPoints.pc)} {
    ${TypoTitleXsM}
  }
`;

const firstTitleAlignStyle = css`
  margin-top: 0;
`;

const flexRow = css`
  display: flex;
`;

const imgStyle = css`
  width: 6rem;
  aspect-ratio: 60/72;
  margin-left: auto;
  object-fit: cover;

  ${mqMin(breakPoints.pc)} {
    width: 14rem;
  }
`;

const textWrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
  span {
    position: relative;
    color: ${variables.colors.gray900};
    ${TypoBodySmR}
  }
  span:not(:last-child)::after {
    content: '|';
    margin-left: 0.6rem;
    color: #ccc;
    font-size: 0.8em;
  }
`;

const reservationInfoStyle = css`
  dl {
    dt {
      ${TypoBodySmR}
      color: ${variables.colors.gray700};
      padding-bottom: 0.2rem;

      ${mqMax(breakPoints.moMax)} {
        display: none;
      }
    }
  }
`;

const marginTop = css`
  margin-top: 0.8rem;
`;
