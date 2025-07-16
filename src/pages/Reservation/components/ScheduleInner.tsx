/** @jsxImportSource @emotion/react */

import Calendar from '@components/Calendar/Calendar';
import ReservationFooter from '@components/ReservationFooter/ReservationFooter';
import { css } from '@emotion/react';
import { useGetAvailableDate } from '@hooks/useGetAvailableDate';
import SelectTime from '@pages/Home/components/SelectTime';
import { getDay, useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { breakPoints, mqMax, mqMin } from '@styles/BreakPoint';
import { Hidden } from '@styles/Common';
import variables from '@styles/Variables';
import { useLocation, useNavigate } from 'react-router-dom';

const ScheduleInner = ({ _id }: { _id: string }) => {
  const { date } = useSelectDateStore();
  const { time } = useSelectTimeStore();
  const [_, month, day] = date.split('-');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: availableDate } = useGetAvailableDate(_id, new Date(date));

  return (
    <>
      <div className="content-box">
        <Calendar type="reservation" disableDates={availableDate?.disableDates} />
        <SelectTime
          type="reservation"
          availableTimeWithDates={availableDate?.availableTimeWithDates}
        />
      </div>

      <div css={fixedBox}>
        <div css={finalDate}>
          <dl>
            <dt css={Hidden}>날짜</dt>
            <dd>{`${month}.${day}.(${getDay(new Date(date))})`}</dd>
          </dl>
          <dl className="timeBox">
            <dt css={Hidden}>시간</dt>
            <dd>{time.length ? time : <span>시간을 선택해주세요</span>}</dd>
          </dl>
        </div>

        <ReservationFooter
          text="다음"
          type="button"
          onClick={() => navigate(`${pathname}/payment`)}
          disabled={!(time.length > 0)}
          testId="toPaymentBtn"
        />
      </div>
    </>
  );
};

export default ScheduleInner;

const fixedBox = css`
  ${mqMax(breakPoints.moMax)} {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid ${variables.colors.gray300};
    background: #fff;
  }
  ${mqMin(breakPoints.pc)} {
    position: sticky;
    bottom: 0;
  }
`;

const finalDate = css`
  padding: 1rem 1.6rem;
  display: flex;
  gap: 1.4rem;
  align-items: center;

  ${mqMin(breakPoints.pc)} {
    display: none;
  }

  // ReservationFooter
  & + div {
    ${mqMax(breakPoints.moMax)} {
      position: initial;
      inset: unset;
    }
  }

  dl {
    padding-left: 2rem;
    background: url(/img/icon-calendar-black.svg) no-repeat center left / 1.2rem 1.3rem;

    &.timeBox {
      background-image: url(/img/icon-clock-black.svg);
      position: relative;

      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: -0.7rem;
        transform: translateY(-50%);
        width: 1px;
        height: 1.8rem;
        background: ${variables.colors.gray300};
      }
    }

    dd {
      span {
        color: ${variables.colors.gray600};
      }
    }
  }
`;
