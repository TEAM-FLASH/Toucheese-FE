/** @jsxImportSource @emotion/react */

import Calendar from '@components/Calendar/Calendar';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/useModal';
import { useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import SelectTime from './SelectTime';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';

const DateBottomSheet = ({}: {}) => {
  const dateTimeModal = useModal(2);
  const { setTime } = useSelectTimeStore();
  const { setDate } = useSelectDateStore();

  const dateTimeButtons = [
    {
      text: '초기화',
      event: () => {
        setDate('reset');
        setTime('reset', 'filter');
      },
      variant: 'gray' as 'gray',
      width: 'fit' as 'fit',
    },
    {
      text: '적용하기',
      event: () => {
        dateTimeModal.close();
      },
    },
  ];

  return (
    <Modal type="fullscreen" title="날짜, 시간 선택" modalId={2} buttons={dateTimeButtons}>
      <div css={modalInner}>
        <Calendar />
        <SelectTime type="filter" />
      </div>
    </Modal>
  );
};

export default DateBottomSheet;

const modalInner = css`
  ${mqMin(breakPoints.pc)} {
    max-width: 44.4rem;
    margin: 0 auto;
  }
`;
