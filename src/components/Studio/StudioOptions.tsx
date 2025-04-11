/** @jsxImportSource @emotion/react */
import Button from '@components/Button/Button';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdSb, TypoTitleXsM } from '@styles/Common';
import variables from '@styles/Variables';
import { IStudioDetail } from 'types/types';

const StudioOptions = ({ data }: { data: IStudioDetail }) => {
  const option = {
    CHANGING_ROOM: '탈의실',
    DRESSING_ROOM: '파우더룸',
    HAIR_MAKEUP: '헤어, 메이크업 수정',
    INDIVIDUAL_EDITING: '1:1 보정',
    SUIT_RENTAL_FREE: '정장 대여',
    ORIGINAL_FILES: '원본파일 제공',
    PARKING_AREA: '주차',
  };

  const optionIcon = {
    CHANGING_ROOM: '/img/icon-room.svg',
    DRESSING_ROOM: '/img/icon-powder.svg',
    HAIR_MAKEUP: '/img/icon-makeup.svg',
    INDIVIDUAL_EDITING: '/img/icon-photo-edit.svg',
    SUIT_RENTAL_FREE: '/img/icon-suit.svg',
    ORIGINAL_FILES: '/img/icon-original-file.svg',
    PARKING_AREA: '/img/icon-parking.svg',
  };

  return (
    <div css={optionsStyle}>
      <p>매장 정보·서비스</p>
      <div>
        {data.options.length === 0
          ? '수집중'
          : data.options.map((optionItem) => (
              <Button
                key={optionItem}
                text={option[optionItem]}
                size="xsmall"
                width="fit"
                variant="white"
                iconSizeWidth="1.5rem"
                iconSizeHeight="1.5rem"
                icon={<img src={optionIcon[optionItem]} alt="매장정보" />}
              />
            ))}
      </div>
    </div>
  );
};

const optionsStyle = css`
  padding: 2rem 0;
  margin-bottom: 5rem;

  & > p {
    ${TypoTitleXsM};
    margin-bottom: 1rem;
    color: ${variables.colors.black};
  }

  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  ${mqMin(breakPoints.pc)} {
    padding: unset;

    & > p {
      ${TypoBodyMdSb}
      margin-bottom: 0.8rem;
      color: ${variables.colors.gray800};
    }
  }
`;

export default StudioOptions;
