/** @jsxImportSource @emotion/react */

import SearchButton from '@components/SearchButton/SearchButton';
import UserButton from '@components/UserButton/UserButton';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import LocalDateSelectionModal from '@pages/Home/components/LocalDateSelectionModal';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import BookingButton from './BookingButton';

/** 메인 전체 지역 예약 날짜 선택 등  */
const BookingSearchContainer = () => {
  return (
    <BookingSearchContainerStyle className="mo">
      <BookingButton type="mo" />
      <div
        css={css`
          display: flex;
          margin-left: auto;
        `}
      >
        <SearchButton />
        <UserButton />
      </div>
      <LocalDateSelectionModal modalId={1} />
    </BookingSearchContainerStyle>
  );
};

const BookingSearchContainerStyle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.8rem;

  ${mqMin(breakPoints.pc)} {
    display: none;
  }
`;

export default BookingSearchContainer;
