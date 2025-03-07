/** @jsxImportSource @emotion/react */
import Modal from '@components/Modal/Modal';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import useBottomSheetState from '@store/useBottomSheetStateStore';
import { changeformatDateForUi, useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import variables from '@styles/Variables';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateBottomSheet from './DateBottomSheet';
import LocationBottomSheet from './LocationBottomSheet';

const LocalDateSelectionModal = ({ modalId }: { modalId: number }) => {
  const { time, setTime } = useSelectTimeStore();
  const { date, setDate } = useSelectDateStore();

  const searchParams = new URLSearchParams(window.location.search);
  const paramsSelectedLocation = searchParams.get('addressGu');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    paramsSelectedLocation ?? '서울전체',
  );
  const { openBottomSheet } = useBottomSheetState();
  const navigate = useNavigate();

  const dateLocationModal = useModal(modalId);
  const dateTimeModal = useModal(2);
  const dateLocationButtons = [
    {
      text: '초기화',
      event: () => {
        setDate('reset');
        setTime('reset', 'filter');
        setSelectedLocation('서울전체');
      },
      variant: 'gray' as 'gray',
      width: 'fit' as 'fit',
    },
    {
      text: '적용하기',
      event: () => {
        setParams();
        dateLocationModal.close();
      },
    },
  ];

  const setParams = () => {
    const newParams = new URLSearchParams(searchParams);

    // 시간을 다중 선택한 경우, times=시간1&times=시간2 형태로 데이터 요청
    newParams.delete('times');
    if (time.length) time.forEach((t) => newParams.append('times', t));

    // 날짜를 초기화한 경우, 파라미터 요청 X
    if (date) newParams.set('date', date);
    else newParams.delete('date');

    // 주소를 '전체보기'로 선택한 경우, 파라미터 요청 X
    if (selectedLocation === '서울전체') newParams.delete('addressGu');
    else newParams.set('addressGu', selectedLocation + '');

    navigate(`?${newParams.toString()}`);
  };

  const handleOpenLocation = () =>
    openBottomSheet(
      <LocationBottomSheet
        setSelectedLocation={setSelectedLocation}
        initialSelectedLocation={selectedLocation}
      />,
      '지역 선택',
    );
  const handleOpenDate = () => dateTimeModal.open();

  return (
    <>
      <Modal
        title="지역, 날짜 선택"
        buttons={dateLocationButtons}
        type="fullscreen"
        isCloseBtn={true}
      >
        <>
          <InputBoxStyle>
            <button type="button" onClick={handleOpenLocation}>
              {selectedLocation ? selectedLocation : '지역 선택'}
            </button>
            <button type="button" onClick={handleOpenDate}>
              {date ? changeformatDateForUi({ date, time }) : '예약 날짜 선택'}
            </button>
          </InputBoxStyle>
        </>
      </Modal>

      <DateBottomSheet />
    </>
  );
};

export default LocalDateSelectionModal;

const InputBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    height: 4.4rem;
    border-radius: 1rem;
    background: ${variables.colors.gray200} url() no-repeat center left 1.4rem / 1.6rem;
    padding-left: 4rem;
    color: ${variables.colors.gray800};
    cursor: pointer;

    &:nth-of-type(1) {
      background-image: url(/img/icon-location.svg);
    }
    &:nth-of-type(2) {
      background-image: url(/img/icon-calendar.svg);
    }
  }
`;
