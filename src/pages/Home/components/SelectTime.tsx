/** @jsxImportSource @emotion/react */

import Button from '@components/Button/Button';
import EmptyMessage from '@components/Message/EmptyMessage';
import { css } from '@emotion/react';
import { filterTimes } from '@hooks/useGetAvailableDate';
import useToast from '@hooks/useToast';
import { convertToDateFormat, today, useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { DividerStyle, Hidden, TypoBodyMdM, TypoBodySmR } from '@styles/Common';
import variables from '@styles/Variables';
import { useMemo } from 'react';

interface ITimes {
  time: string;
  available: boolean;
}

interface ITimeProp {
  type: 'filter' | 'reservation';
  availableTimeWithDates?: {
    date: string;
    availableTimeDto: ITimes[];
  }[];
}

const SelectTime = ({ type, availableTimeWithDates }: ITimeProp) => {
  const { date: selectedDate } = useSelectDateStore();
  const { time: selectedTime, setTime } = useSelectTimeStore();

  const getTimes = () => {
    if (type === 'filter') return filterTimes;
    if (type === 'reservation') {
      return availableTimeWithDates?.find((TimeWithDate) => TimeWithDate.date === selectedDate)
        ?.availableTimeDto;
    }
  };

  const morningTimes = useMemo(
    () => getTimes()?.filter(({ time }) => time < '12:00'),
    [getTimes()],
  );

  const afternoonTimes = useMemo(
    () => getTimes()?.filter(({ time }) => time >= '12:00'),
    [getTimes()],
  );

  const isLowerThanCurrentTime = (time: string) => {
    const newDate = new Date();
    const currentTime = `${newDate.getHours()}:${newDate.getMinutes()}`;
    const isTodaySelected = selectedDate === convertToDateFormat(today);
    return isTodaySelected ? time >= currentTime : true;
  };

  const openToast = useToast();
  const handleTImeClick = (value: string) => {
    if (!selectedDate) return openToast('날짜를 먼저 선택해주세요.');
    setTime(value, type);
  };

  if (type === 'reservation') {
    if (!getTimes())
      return (
        <div css={emptyMessageBox}>
          <EmptyMessage message="예약이 불가능합니다." />
        </div>
      );
  }

  return (
    <>
      <section css={[SelectTimeStyle(type), DividerStyle]}>
        <h2 css={Hidden}>시간 선택</h2>

        <div css={articleBox} data-testid="timeBox">
          {morningTimes?.length ? (
            <article>
              <h3 css={timeZoneTitle}>오전</h3>
              <ul>
                {morningTimes.map(({ time, available }) => (
                  <li key={time}>
                    <Button
                      key={time}
                      text={time}
                      variant="white"
                      size="small"
                      width="max"
                      active={!!selectedTime.length && selectedTime.includes(time)}
                      onClick={() => handleTImeClick(time)}
                      disabled={available && isLowerThanCurrentTime(time) ? false : true}
                    />
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {afternoonTimes?.length ? (
            <article>
              <h3 css={timeZoneTitle}>오후</h3>
              <ul>
                {afternoonTimes.map(({ time, available }) => (
                  <li key={time}>
                    <Button
                      key={time}
                      text={time}
                      variant="white"
                      size="small"
                      width="max"
                      active={!!selectedTime.length && selectedTime.includes(time)}
                      onClick={() => handleTImeClick(time)}
                      disabled={available && isLowerThanCurrentTime(time) ? false : true}
                    />
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
        </div>

        {type === 'filter' && (
          <>
            <p css={infoText}>중복 선택이 가능합니다.</p>
            <p css={infoText}>선택하지 않으면 전체 시간이 조회됩니다.</p>
          </>
        )}

        <h3 css={Hidden}>
          선택된 시간: <span className="selected">{selectedTime.join(',')}</span>
        </h3>
      </section>
    </>
  );
};

export default SelectTime;

const SelectTimeStyle = (type: string) => css`
  padding-top: 3rem;
  ${mqMin(breakPoints.pc)} {
    padding-top: ${type === 'reservation' && '4.6rem'};
  }

  &::after {
    bottom: auto;
    top: 0;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem 0.8rem;

    span {
      display: none;
      &.first {
        display: block;
      }
    }
  }

  button {
    height: 3.6rem;
    font-weight: normal;
  }
`;

const timeZoneTitle = css`
  ${TypoBodyMdM}
  margin-bottom: 1rem;
`;

const articleBox = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button:disabled {
    color: ${variables.colors.gray500};
    border: 1px solid ${variables.colors.gray400};
    background-color: #fff;
  }
`;

const infoText = css`
  margin-top: 0.8rem;
  padding-left: 2rem;
  ${TypoBodySmR}
  background: url(/img/icon-info-gray600.svg) no-repeat center left / 1.4rem;

  &:first-of-type {
    margin-top: 2rem;
  }
`;

const emptyMessageBox = css`
  padding: 3rem 0;
`;
