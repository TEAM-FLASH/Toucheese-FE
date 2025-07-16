/** @jsxImportSource @emotion/react */
import Header from '@components/Header/Header';
import ReservationNavigator from '@components/Navigator/ReservationNavigator';
import NoResult from '@components/NoResult/NoResult';
import ReservationCard from '@components/ReservationCard/ReservationCard';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useGetReservationList } from '@hooks/useGetReservationList';
import useToast from '@hooks/useToast';
import { breakPoints, mqMax, mqMin } from '@styles/BreakPoint';
import { bg100vw, PCLayout, TypoBodyMdM, TypoTitleMdSb } from '@styles/Common';
import variables from '@styles/Variables';
import { sortReservations } from '@utils/sortReservations';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { IResvItem } from 'types/types';

interface ResStatus {
  statusKor: '이용 예정' | '이용 완료' | '예약 취소';
  statusEng: 'DEFAULT' | 'COMPLETED' | 'CANCELED';
}

const ReservationList = () => {
  const STATUS: ResStatus[] = [
    { statusKor: '이용 예정', statusEng: 'DEFAULT' },
    { statusKor: '이용 완료', statusEng: 'COMPLETED' },
    { statusKor: '예약 취소', statusEng: 'CANCELED' },
  ];
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

  useEffect(() => {
    if (error) {
      if (error.message === '403') {
        openToast('로그인 세션이 만료되었습니다. 다시 로그인 해주세요!');
        navigate('/user/auth');
      } else {
        throw new Error(error.message);
      }
    }
  }, [error]);

  // resStatus 변경 시 아이템 초기화
  useEffect(() => {
    setItems([]);
  }, [resStatus.statusEng]);

  useEffect(() => {
    if (data) {
      const validData = sortReservations<IResvItem>(
        resStatus.statusEng === 'DEFAULT' ? data.filter((item) => compareDate(item.date)) : data,
      );
      setItems(validData);
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

  const compareDate = (date: string) => {
    const itemDate = new Date(date);
    const today = new Date();

    itemDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return itemDate.getTime() >= today.getTime();
  };

  return (
    <>
      <Helmet>
        <title>예약 내역 - {resStatus.statusKor}</title>
        <meta property="og:title" content={`예약 내역 - ${resStatus.statusKor} `} />
      </Helmet>
      <main
        css={css`
          margin-bottom: -3rem;
        `}
      >
        <MyPageHeaderContainerStyle>
          {isPc ? (
            <h1 className="pcLayout">예약내역</h1>
          ) : (
            <Header title="예약내역" backTo="/user/mypage" fixed={true} />
          )}
          <div
            css={css`
              ${mqMin(breakPoints.pc)} {
                width: 28.7rem;
              }
            `}
          >
            <ReservationNavigator<ResStatus>
              STATUS={STATUS}
              status={resStatus}
              setStatus={setResStatus}
            />
          </div>
        </MyPageHeaderContainerStyle>

        <MyPageSectionStyle>
          {items.length ? (
            <MyPageContentStyle>
              <h2 css={TypoBodyMdM}>총 {items.length}건</h2>
              <div className="content-box">
                {items.map((item) => (
                  <ReservationCard key={item.reservationId} data={item} />
                ))}
              </div>
            </MyPageContentStyle>
          ) : (
            <NoResult message={emptyMessage} bg="gray100" />
          )}
        </MyPageSectionStyle>
      </main>
    </>
  );
};

export const MyPageHeaderContainerStyle = styled.div`
  background-color: ${variables.colors.white};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;

  .pcLayout {
    ${TypoTitleMdSb}
    padding: 4rem 0 2rem;
  }

  ${mqMax(breakPoints.moMax)} {
    & > div {
      padding-top: ${variables.headerHeight};
    }
  }

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    ${bg100vw(variables.colors.white)}
    padding: 0 ${variables.layoutPadding};
    box-shadow: inset 0 -1px ${variables.colors.gray300};
    position: fixed;
    top: 8rem;

    &::before {
      box-shadow: inset 0 -1px ${variables.colors.gray300};
    }
  }
`;

export const MyPageSectionStyle = styled.section`
  ${bg100vw(variables.colors.gray100)}
  margin: 10rem calc(-1 * ${variables.layoutPadding}) calc(-1 * (4rem + ${variables.headerHeight}));
  padding: 0 ${variables.layoutPadding} ${variables.headerHeight};
  min-height: calc(100vh - 10rem);

  ${mqMin(breakPoints.pc)} {
    ${PCLayout}
    min-height: calc(100vh - 21.8rem);
    margin: 13.8rem 0 -3rem;
    padding: 0 0 3rem;
    box-sizing: border-box;
  }
`;

export const MyPageContentStyle = styled.div`
  padding-top: 2.4rem;

  .content-box {
    margin-top: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    ${mqMin(breakPoints.pc)} {
      margin-top: 1.6rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    }
  }
`;

export default ReservationList;
