import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import FilterPriceSlideComponent from '@components/FilterPriceSlide/FilterPriceSlide';

describe('FilterPriceSlideComponent', () => {
  test('초기값이 올바르게 렌더링되는지 확인', () => {
    render(
      <MemoryRouter>
        <FilterPriceSlideComponent />
      </MemoryRouter>,
    );
    expect(screen.getByText(/원~/)).toHaveTextContent('10000원~');
    expect(screen.getByText(/원 이상/)).toHaveTextContent('200000 원 이상');
  });

  test('최소값 슬라이더 변경 시 값이 업데이트되는지 확인', () => {
    render(
      <MemoryRouter>
        <FilterPriceSlideComponent />
      </MemoryRouter>,
    );
    const minSlider = screen.getByLabelText('slider1'); // 슬라이더의 레이블을 수정하여 올바른 슬라이더를 선택

    fireEvent.change(minSlider, { target: { value: '15000' } });
    expect(screen.getByText(/원~/)).toHaveTextContent('15000원~');
  });

  test('최대값 슬라이더 변경 시 값이 업데이트되는지 확인', () => {
    render(
      <MemoryRouter>
        <FilterPriceSlideComponent />
      </MemoryRouter>,
    );
    const maxSlider = screen.getByLabelText('slider2'); // 슬라이더의 레이블을 수정하여 올바른 슬라이더를 선택

    fireEvent.change(maxSlider, { target: { value: '180000' } });
    expect(screen.getByText(/원 이상/)).toHaveTextContent('180000 원 이상');
  });
});
