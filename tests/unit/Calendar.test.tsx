import Calendar from '@components/Calendar/Calendar';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { convertToDateFormat } from '@store/useSelectDateStore';
import userEvent from '@testing-library/user-event';

describe('달력 컴포넌트', () => {
  const today = new Date();
  const [_, todayMonth, todayDate] = convertToDateFormat(today).split('-');

  beforeEach(() => {
    render(<Calendar />);
  });

  test('달력이 오류 없이 렌더링 된다', () => {
    const monthText = screen.getByText(/날짜로 이동/);
    expect(monthText).toBeInTheDocument();
  });

  test('월 변경 버튼을 클릭하면 월이 변경된다', async () => {
    const monthText = screen.getByText(new RegExp(`${+todayMonth}월`));
    const toNextMonthButton = screen.getByText('다음 달로 이동');
    const toPrevMonthButton = screen.getByText('이전 달로 이동');

    // 다음 달로 이동 버튼 클릭
    await userEvent.click(toNextMonthButton);
    expect(monthText).toHaveTextContent(`${todayMonth !== '12' ? +todayMonth + 1 : 1}월`);
    await userEvent.click(toPrevMonthButton); // 현재 달로 복귀

    // 이전 달로 이동 버튼 클릭
    await userEvent.click(toPrevMonthButton);
    expect(monthText).toHaveTextContent(`${todayMonth !== '01' ? +todayMonth - 1 : 12}월`);
  });

  test('내일 날짜를 클릭하면 내일 날짜로 선택된 날짜의 값이 변경된다', async () => {
    const selectedDate = screen.getByText(/선택된 날짜/);

    // 선택된 버튼 : 내일 날짜 || 내일 날짜가 달력에 없는 경우, 오늘 날짜
    const selectedButton =
      screen.getAllByRole('button', { name: `${+todayDate + 1} 일` })[0] ||
      screen.getAllByRole('button', { name: `${todayDate} 일` })[0];

    // 내일 날짜의 버튼 클릭
    await userEvent.click(selectedButton);
    // 선택된 날짜가 내일 날짜로 변경되는지 확인
    expect(selectedDate).toHaveTextContent(`${+todayDate + 1}`);
  });

  test('"오늘"을 클릭하면 오늘 날짜로 이동한다', async () => {
    const selectedDate = screen.getByText(/선택된 날짜/);
    const toTodayButton = screen.getByText(/오늘/);

    // '오늘' 버튼 클릭
    await userEvent.click(toTodayButton);
    expect(selectedDate).toHaveTextContent(convertToDateFormat(today));
  });
});
