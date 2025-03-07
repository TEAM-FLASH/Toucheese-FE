/** @jsxImportSource @emotion/react */

import Modal from '@components/Modal/Modal';
import TextArea from '@components/TextArea/TextArea';
import { css } from '@emotion/react';
import useModal from '@hooks/useModal';
import { TypoTitleSmS, TypoTitleXsR } from '@styles/Common';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const CancelModal = ({ modalId }: { modalId: number }) => {
  const cancelReasonModal = useModal(modalId);
  const cancelConfirmModal = useModal(2);
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedReason, setSelectedReason] = useState(false);

  const { mutate } = useMutation({
    // mutationFn:  ,
  });

  const handleCancel = () => {
    console.log('취소 API 작업');
    console.log(textareaValue); // 빌드 오류 방지
    mutate();
  };

  const cancelReasonButton = [
    {
      text: '예약 취소하기',
      variant: 'deepGray' as 'deepGray',
      active: selectedReason,
      disabled: !selectedReason,
      type: 'submit' as 'submit',
      event: () => {
        cancelConfirmModal.open();
      },
    },
  ];

  const cancelConfirmButton = [
    {
      text: '예약 유지',
      event: () => {
        cancelConfirmModal.close();
        cancelReasonModal.close();
      },
      variant: 'gray' as 'gray',
    },
    {
      text: '예약 취소',
      event: () => {
        handleCancel();
        cancelConfirmModal.close();
        cancelReasonModal.close();
      },
    },
  ];

  const handleChangeReason = () => setSelectedReason(true);

  return (
    <>
      <Modal type="fullscreen" title="예약취소" buttons={cancelReasonButton} modalId={modalId}>
        <>
          <section>
            <h3 css={cancelTitle}>
              예약을 취소하는 이유를 알려주세요. <span>(필수)</span>
            </h3>
            <ul css={cancelList}>
              <li>
                <input
                  type="radio"
                  name="cancelReason"
                  id="scheduleChange"
                  value="일정 변경"
                  onChange={() => handleChangeReason()}
                />
                <label htmlFor="scheduleChange">일정 변경</label>
              </li>
              <li>
                <input type="radio" name="cancelReason" id="rebook" value="다른 옵션으로 재예약" />
                <label htmlFor="rebook">다른 옵션으로 재예약</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="cancelReason"
                  id="useAnotherStudio"
                  value="다른 사진관 이용"
                  onChange={() => handleChangeReason()}
                />
                <label htmlFor="useAnotherStudio">다른 사진관 이용</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="cancelReason"
                  id="changeOfMind"
                  value="단순 변심"
                  onChange={() => handleChangeReason()}
                />
                <label htmlFor="changeOfMind">단순 변심</label>
              </li>
              <li>
                <input
                  type="radio"
                  name="cancelReason"
                  id="etc"
                  value="기타"
                  onChange={() => handleChangeReason()}
                />
                <label htmlFor="etc">기타</label>
              </li>
            </ul>
          </section>
          <section css={cancelLayout}>
            <h3 css={cancelTitle}>
              취소 사유 상세 <span>(선택)</span>
            </h3>
            <TextArea
              setTextArea={setTextareaValue}
              placeholder="예약을 취소하는 이유를 구체적으로 알려주세요."
              name="cancelReason"
              id="cancelReason"
            />
          </section>
        </>
      </Modal>

      <Modal
        modalId={2}
        type="default"
        title="정말 예약을 취소하시겠어요?"
        buttons={cancelConfirmButton}
      >
        예약 취소 시 복구할 수 없어요.
      </Modal>
    </>
  );
};

export default CancelModal;

const cancelTitle = css`
  ${TypoTitleSmS}
  padding: 1rem 0 1.6rem;

  span {
    font-weight: normal;
  }
`;

const cancelList = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  li {
    ${TypoTitleXsR}
  }
`;

const cancelLayout = css`
  margin-top: 1rem;
`;
