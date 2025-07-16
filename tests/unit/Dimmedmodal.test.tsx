import useModal from '@hooks/useModal';
import DimmedModal from '@pages/Studio/components/DimmedModal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SwiperSlide } from 'swiper/react';
import { describe } from 'vitest';

const TestPage = () => {
  const { open } = useModal(1);

  return (
    <div>
      <div onClick={() => open()}>
        <img src="/img/sample-1.png" alt="샘플 이미지 1" />
        <img src="/img/sample-2.png" alt="샘플 이미지 2" />
        <img src="/img/sample-1.png" alt="샘플 이미지 3" />
        <img src="/img/sample-2.png" alt="샘플 이미지 4" />
      </div>
      <DimmedModal>
        <SwiperSlide key={1} data-testid={1}>
          <img src="/img/sample-1.png" alt="샘플 이미지 1" />
        </SwiperSlide>
        <SwiperSlide key={2} data-testid={2}>
          <img src="/img/sample-2.png" alt="샘플 이미지 2" />
        </SwiperSlide>
        <SwiperSlide key={3} data-testid={3}>
          <img src="/img/sample-1.png" alt="샘플 이미지 3" />
        </SwiperSlide>
        <SwiperSlide key={4} data-testid={4}>
          <img src="/img/sample-2.png" alt="샘플 이미지 4" />
        </SwiperSlide>
      </DimmedModal>
    </div>
  );
};

describe('Dimmed Modal Test', () => {
  test('이미지를 클릭하면 해당 이미지가 있는 모달을 렌더링한다.', async () => {
    render(<TestPage />);
    const user = userEvent.setup();
    const img = screen.getByRole('img', { name: /샘플 이미지 1/i });

    // 이미지 클릭
    await user.click(img);

    // 모달 닫기 버튼이 있는지 확인하여 모달 렌더링 확인
    const modalCloseBtn = screen.getByRole('button', { name: /모달 닫기/i });

    expect(modalCloseBtn).toBeInTheDocument();
  });

  test('닫기 버튼을 클릭하면 모달을 종료한다.', async () => {
    render(<TestPage />);
    const user = userEvent.setup();

    const modalCloseBtn = screen.getByRole('button', { name: /모달 닫기/i });

    // 닫기 버튼 클릭
    await user.click(modalCloseBtn);

    // 모달 닫기 버튼이 없음을 확인
    expect(modalCloseBtn).not.toBeInTheDocument();
  });
});
