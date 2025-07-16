/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { convertToDateFormat, lessThan10Add0, useSelectDateStore } from '@store/useSelectDateStore';
import { Hidden } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import createCalendar from './createCalendar';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { breakPoints, mqMax, mqMin } from '@styles/BreakPoint';

interface CalendarProp {
  type?: string;
  disableDates?: string[] | null;
}

interface Day {
  year: number;
  month: number;
  date: number;
}

const Calendar = ({ type = 'filter', disableDates }: CalendarProp) => {
  const { date: activeDay, setDate: setActiveDay } = useSelectDateStore();
  const [baseDate, setBaseDate] = useState(activeDay ? new Date(activeDay) : new Date());
  const [calendar, setCalendar] = useState<Day[]>();
  const [startClientX, setStartClientX] = useState(0);
  const [endClientX, setEndClientX] = useState(0);
  const { time, setTime } = useSelectTimeStore();

  const baseYear = baseDate.getFullYear();
  const baseMonth = baseDate.getMonth();
  const today = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const resetTime = () => setTime('reset');

  const changeMonth = (direction: number) => {
    const firstOfChangedMonth = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + direction,
      1,
    );
    if (time) resetTime();
    setBaseDate(firstOfChangedMonth);
  };

  const moveToToday = () => {
    if (time) resetTime();
    setBaseDate(today);
    setActiveDay(convertToDateFormat(today));
  };

  const handleDateClick = (year: number, month: number, day: number) => {
    if (time) resetTime();
    const currentMonth = baseDate.getMonth() + 1;
    const value = convertToDateFormat(
      new Date(`${year}-${lessThan10Add0(month)}-${lessThan10Add0(day)}`),
    );
    setActiveDay(value);

    // 12월, 1월 예외처리
    if (month === 12 && currentMonth === 1) return changeMonth(-1);
    if (month === 1 && currentMonth === 12) return changeMonth(1);

    // 클릭한 달과 현재 달을 비교하여 Month 변경
    if (month > currentMonth) changeMonth(1);
    if (month < currentMonth) changeMonth(-1);
  };

  useEffect(() => {
    createCalendar(baseYear, baseMonth, setCalendar);
  }, [baseDate]);

  useEffect(() => {
    // 초기화(활성화 날짜가 오늘로 변경)했을 경우, 오늘 날짜로 이동
    if (activeDay === convertToDateFormat(today)) moveToToday();
  }, [activeDay]);

  useEffect(() => {
    // 달력 위에서 스와이프 했을 때 월 변경
    if (startClientX === endClientX) return;
    if (startClientX > endClientX) changeMonth(1);
    else changeMonth(-1);
  }, [endClientX]);

  return (
    <CalendarWrStyle>
      <h2 css={Hidden}>날짜 선택</h2>

      <TopStyle>
        <TodayStyle onClick={moveToToday}>
          오늘 <span css={Hidden}>날짜로 이동</span>
        </TodayStyle>
        <TitleStyle>
          <button
            onClick={() => changeMonth(-1)}
            css={css`
              transform: rotate(180deg);
            `}
          >
            <span css={Hidden}>이전 달로 이동</span>
          </button>
          <div>
            {baseYear}년 {baseMonth + 1}월
          </div>
          <button onClick={() => changeMonth(1)}>
            <span css={Hidden}>다음 달로 이동</span>
          </button>
        </TitleStyle>
      </TopStyle>
      <CalendarStyle>
        <DayOfWeekStyle>
          {week.map((day) => (
            <li key={day} css={calendarRatio(type)}>
              {day}
            </li>
          ))}
        </DayOfWeekStyle>
        <ul
          onTouchStart={(e) => setStartClientX(e.touches[0].clientX)}
          onTouchEnd={(e) => setEndClientX(e.changedTouches[0].clientX)}
          data-testid="dateBox"
        >
          {calendar &&
            calendar.map(({ year, month, date }) => {
              const isActive =
                activeDay === `${year}-${lessThan10Add0(month)}-${lessThan10Add0(date)}`;
              const isNextMonth = month != baseMonth + 1;
              const isPrevToday = today > new Date(year, month - 1, date + 1);
              const isReservationComplete =
                type === 'reservation' && disableDates?.includes(`${+month}-${+date}`);
              return (
                <li
                  css={css`
                    ${isActive && activeStyle};
                    ${isNextMonth && nextMonthStyle};
                    ${isPrevToday && disabledStyle}
                    ${isReservationComplete && disabledStyle}
                    ${calendarRatio(type)}
                  `}
                  key={`${month} - ${date}`}
                >
                  <button
                    type="button"
                    css={calendarRatio(type)}
                    onClick={() => handleDateClick(year, month, date)}
                    disabled={isPrevToday}
                  >
                    {date}
                    <span css={Hidden}>일</span>
                  </button>
                </li>
              );
            })}
        </ul>
        <h3 css={Hidden}>
          선택된 날짜: <span className="selected">{activeDay}</span>
        </h3>
      </CalendarStyle>
    </CalendarWrStyle>
  );
};

export default Calendar;

const calendarRatio = (type: string) => css`
  ${mqMax(breakPoints.moMax)} {
    aspect-ratio: 1/1;
  }
  ${mqMin(breakPoints.pc)} {
    aspect-ratio: ${type === 'reservation' ? '88/53' : '1/1'};
  }
`;

const CalendarWrStyle = styled.article`
  max-width: 620px;
  width: 100%;
  margin: 0 auto 1rem;

  ${mqMin(breakPoints.pc)} {
    margin: 1.6rem auto 2rem;
  }
`;

const TopStyle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 0.4rem;
`;

const TodayStyle = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: calc(100% / 7);
  text-align: center;
  font-size: 1.4rem;
  color: ${variables.colors.primary800};
  text-decoration: underline;
`;

const TitleStyle = styled.div`
  display: flex;
  gap: 1.2rem;
  font-size: 1.8rem;
  font-weight: 500;

  button {
    width: 2.4rem;
    background: url(/img/icon-chevronright.svg) no-repeat center;
  }
`;

const CalendarStyle = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-size: 1.6rem;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 0;

      button {
        width: 100%;
        text-align: center;
      }
    }
  }
`;

const DayOfWeekStyle = styled.ul`
  li {
    font-size: 1.2rem;
    color: ${variables.colors.gray700};
  }
`;

export const activeStyle = css`
  position: relative;
  &::before {
    content: '';
    display: block;
    background-color: ${variables.colors.primary500};
    width: 3.6rem;
    aspect-ratio: 1/1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    border-radius: 50%;
  }
`;

export const nextMonthStyle = css`
  color: ${variables.colors.gray700};
`;

export const disabledStyle = css`
  color: ${variables.colors.gray400};

  button {
    cursor: default;
    pointer-events: none;
  }
`;
