/** @jsxImportSource @emotion/react */

import Calendar from '@components/Calendar/Calendar';
import Header from '@components/Header/Header';
import SelectTime from '@pages/Home/components/SelectTime';
import { Hidden } from '@styles/Common';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { convertToDateFormat, getDay, today, useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import ReservationFooter from '@components/ReservationFooter/ReservationFooter';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useGetAvailableDate } from '@hooks/useGetAvailableDate';

const ReservationSchedule = () => {
  const { _id } = useParams() as { _id: string };
  const { time, setTime } = useSelectTimeStore();
  const { date, setDate } = useSelectDateStore();
  const [_, month, day] = date.split('-');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: availableDate } = useGetAvailableDate(_id, new Date(date));

  // 필터링 시 날짜, 시간 초기화
  useEffect(() => {
    setDate(convertToDateFormat(today));
    setTime('reset');
  }, []);

  return (
    <>
      <Helmet>
        <title>{`터치즈 - 예약하기`}</title>
        <meta property="og:title" content="터치즈 - 예약하기" />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:description" content="터치즈 - 예약하기" />
      </Helmet>

      <Header title="예약하기" />

      <div css={contentBox}>
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
        />
      </div>
    </>
  );
};

export default ReservationSchedule;

const contentBox = css`
  padding-bottom: 8rem;
`;

const fixedBox = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid ${variables.colors.gray300};
  background: #fff;
`;

const finalDate = css`
  padding: 1rem 1.6rem;
  display: flex;
  gap: 1.4rem;
  align-items: center;

  // ReservationFooter
  & + div {
    position: initial;
    inset: unset;
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
