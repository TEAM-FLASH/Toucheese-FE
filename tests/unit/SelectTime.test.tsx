import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import SelectTime from '@pages/Home/components/SelectTime';

describe('시간 선택 컴포넌트', () => {
  test('type이 "filter"인 경우, 시간을 여러 개 선택할 수 있다.', async () => {
    render(<SelectTime type="filter" />);
    const times = screen.getAllByRole('button');

    for (let time of times) {
      await userEvent.click(time);
    }

    const selectedTimeEl = screen.getByText(/선택된 시간/);
    const selectedTimes = selectedTimeEl.textContent!.split('시간: ')[1].split(',');
    expect(selectedTimes.length).toBeGreaterThan(1);
  });

  test('type이 "reservation"인 경우, 시간을 한 개만 선택할 수 있다.', async () => {
    render(<SelectTime type="reservation" />);
    const times = screen.getAllByRole('button');

    for (let time of times) {
      await userEvent.click(time);
    }

    const selectedTimeEl = screen.getByText(/선택된 시간/);
    const selectedTimes = selectedTimeEl.textContent!.split('시간: ')[1].split(',');
    expect(selectedTimes.length).toEqual(1);
  });
});
