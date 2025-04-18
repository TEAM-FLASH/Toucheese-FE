/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ReservationNavigator from '@components/Navigator/ReservationNavigator';
import NoResult from '@components/NoResult/NoResult';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useGetReservationList } from '@hooks/useGetReservationList';
import useToast from '@hooks/useToast';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, PCLayout, TypoBodyMdM, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
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
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });
  const openToast = useToast();
  const navigate = useNavigate();

  // resStatus 변경 시 api 호출
  const { data, error } = useGetReservationList(resStatus.statusEng);

  if (error) {
    if (error.message === '403') {
      openToast('로그인 세션이 만료되었습니다. 다시 로그인 해주세요!');
      navigate('/user/auth');
    } else {
      throw new Error(error.message);
    }
  }

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
        <>
          예약한 사진관이 없습니다.
          <br />
          사진관을 예약하고 인생 사진을
          <br />
          찍어보세요!
        </>
      );
      break;
    case '이용 완료':
      emptyMessage = <>방문한 사진관이 없습니다.</>;
      break;
    case '예약 취소':
      emptyMessage = <>예약 취소한 사진관이 없습니다.</>;
      break;
  }

  return (
    <main
      css={css`
        ${PCLayout}
        ${bg100vw(variables.colors.gray100)}
      `}
    >
      <HeaderContainerStyle>
        {isPc ? (
          <div
            css={css`
              padding: 4rem 0 2rem;
            `}
          >
            <h1 css={TypoTitleMdSb}>예약내역</h1>
          </div>
        ) : (
          <Header title="예약내역" backTo="/user/mypage" />
        )}
        <div
          css={css`
            ${mqMin(breakPoints.pc)} {
              width: 28.7rem;
            }
          `}
        >
          <ReservationNavigator status={resStatus} setStatus={setResStatus} />
        </div>
      </HeaderContainerStyle>

      <SectionStyle>
        {items.length ? (
          <ContentStyle>
            <p css={TypoBodyMdM}>총 {items.length}건</p>
            <div
              css={css`
                margin-top: 0.8rem;
                display: flex;
                flex-direction: column;
                gap: 0.8rem;

                ${mqMin(breakPoints.pc)} {
                  margin-top: 1.6rem;
                  display: grid;
                  grid-template-columns: repeat(3, minmax(0, 1fr));
                }
              `}
            >
              {items
                .sort((a, b) => {
                  // 1. date 비교
                  if (a.date !== b.date) {
                    return a.date < b.date ? -1 : 1; // date가 빠른 순으로 정렬
                  }

                  // 2. startTime 비교 (date가 같을 때)
                  return a.startTime < b.startTime ? -1 : 1;
                })
                .map((item) => (
                  <ReservationCard key={item.reservationId} data={item} />
                ))}
            </div>
          </ContentStyle>
        ) : (
          <NoResult message={emptyMessage} bg="gray100" />
        )}
      </SectionStyle>
    </main>
  );
};

const HeaderContainerStyle = styled.div`
  background-color: ${variables.colors.white};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    ${bg100vw(variables.colors.white)}
    padding: 0 ${variables.layoutPadding};
    box-shadow: inset 0 -0.1rem ${variables.colors.gray300};
    position: fixed;
    top: 8rem;
    left: 0;
    right: 0;
    z-index: 9;

    &::before {
      box-shadow: inset 0 -0.1rem ${variables.colors.gray300};
    }
  }
`;

const SectionStyle = styled.section`
  margin: 10rem calc(-1 * ${variables.layoutPadding}) calc(-1 * (4rem + ${variables.headerHeight}));
  background-color: ${variables.colors.gray100};
  padding: 0 ${variables.layoutPadding} calc(4rem + ${variables.headerHeight});
  min-height: calc(100vh - 10rem);
  overflow-y: auto;

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    min-height: calc(100vh - 21.8rem);
    margin: unset;
    padding-left: unset;
    padding-right: unset;
    margin-top: 13.8rem;
    box-sizing: border-box;
  }
`;

const ContentStyle = styled.div`
  padding-top: 2.4rem;
`;

export default ReservationList;
