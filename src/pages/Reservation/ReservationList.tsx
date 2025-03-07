/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ReservationNavigator from '@components/Navigator/ReservationNavigator';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useGetReservationList } from '@hooks/useGetReservationList';
import { TypoBodyMdM, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { IResvItem } from 'types/types';

export interface ResStatus {
  statusKor: '이용 예정' | '이용 완료' | '예약 취소';
  statusEng: 'DEFAULT' | 'COMPLETED' | 'CANCELED';
}

const ReservationList = () => {
  const [resStatus, setResStatus] = useState<ResStatus>({
    statusKor: '이용 예정',
    statusEng: 'DEFAULT',
  });
  const [items, setItems] = useState<IResvItem[]>([]);

  // resStatus 변경 시 api 호출
  const { data } = useGetReservationList(resStatus.statusEng);

  // resStatus 변경 시 아이템 초기화
  useEffect(() => {
    setItems([]);
  }, [resStatus.statusEng]);

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  // 예약 내역이 없을 시 메시지 생성
  let emptyMessage;
  switch (resStatus.statusKor) {
    case '이용 예정':
      emptyMessage = (
        <p css={TypoTitleXsM}>
          예약한 사진관이 없습니다.
          <br />
          사진관을 예약하고 인생 사진을
          <br />
          찍어보세요!
        </p>
      );
      break;
    case '이용 완료':
      emptyMessage = <p css={TypoTitleXsM}>방문하신 사진관이 없습니다.</p>;
      break;
    case '예약 취소':
      emptyMessage = <p css={TypoTitleXsM}>예약 취소하신 사진관이 없습니다.</p>;
      break;
  }

  return (
    <>
      <HeaderContainerStyle>
        <Header title="예약내역" backTo="/user/mypage" customStyle={headerStyle} />
        <ReservationNavigator status={resStatus} setStatus={setResStatus} />
      </HeaderContainerStyle>

      <SectionStyle className={items.length ? '' : 'empty'}>
        {items.length ? (
          <ContentStyle>
            <p css={TypoBodyMdM}>총 {items.length}건</p>
            {items.map((item) => (
              <ReservationCard key={item.reservationId} data={item} />
            ))}
          </ContentStyle>
        ) : (
          emptyMessage
        )}
      </SectionStyle>
    </>
  );
};

const HeaderContainerStyle = styled.div`
  background-color: ${variables.colors.white};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const SectionStyle = styled.section`
  margin: 0 calc(-1 * ${variables.layoutPadding}) -8.8rem;
  background-color: ${variables.colors.gray100};
  padding: 10rem ${variables.layoutPadding} calc(4rem + ${variables.headerHeight});
  height: calc(100vh);
  overflow-y: auto;

  &.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${variables.colors.gray700};

    & > p {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.733rem;
      text-align: center;

      &::before {
        content: '';
        width: 4.2rem;
        height: 4.2rem;
        background-image: url('/img/icon-noreservation.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
  }
`;

const ContentStyle = styled.div`
  padding-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const headerStyle = css`
  position: unset;
  display: flex;
  align-items: center;
  padding: 1.6rem;
`;

export default ReservationList;
