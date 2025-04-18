/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import {
  DividerStyle,
  TypoBodyMdM,
  TypoBodyMdR,
  TypoBodyMdSb,
  TypoTitleXsB,
  TypoTitleXsM,
} from '@styles/Common';
import { IMenuListRes } from 'types/types';
import useReservationStore, { ReservationOption } from '@store/useReservationStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';

const StudioMenuDetailInfo = ({ infoItem }: { infoItem: IMenuListRes }) => {
  const [hours, minutes, seconds] = infoItem.duration
    ? infoItem.duration.split(':').map(Number)
    : [0, 0, 0];
  const totalMinutes = hours * 60 + minutes + seconds / 60;
  const { addOptionPrice, options } = useReservationStore();

  const handleOptionClick = (option: ReservationOption, e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    addOptionPrice(option, isChecked);
  };

  return (
    <>
      <div css={MenuInfoWrapperStyle}>
        <section css={MenuInfoStyle}>
          <div className="menuInfoItem">
            <h3 className="time">예상 소요 시간</h3>
            <p>약 {infoItem.duration ? totalMinutes : 60}분</p>
          </div>
          <div className="menuInfoItem">
            <h3 className="camera">기본 촬영 수</h3>
            <p>{infoItem.pictureNum ? infoItem.pictureNum : `70-80컷`}</p>
          </div>
          <div className="menuInfoItem">
            <h3 className="crop">인화 사이즈</h3>
            <p>{infoItem.pictureSize ? infoItem.pictureSize : '4x6in'}</p>
          </div>
          <div className="menuInfoItem">
            <h3 className="folder">기본 제공 파일</h3>
            <p>{infoItem.offerFile ? infoItem.offerFile : '3포즈 리터칭 JPG파일'}</p>
          </div>
        </section>

        <section css={[TotalPriceStyle, DividerStyle]}>
          <h3>기본 가격</h3>
          <p>{infoItem.price.toLocaleString('ko-KR')}원</p>
        </section>

        <section css={AddOptionsWrapperStyle}>
          <h3>추가 옵션</h3>

          <ul css={AddOptionsListStyle}>
            {infoItem.additionalOptions.map((item) => (
              <li key={item.id}>
                <div>
                  <input
                    type="checkbox"
                    id={`${item.price}`}
                    name="OptionPrice"
                    value={`${item.price}`}
                    onChange={(e) =>
                      handleOptionClick(
                        { option_id: item.id, optionPrice: item.price, optionName: item.name },
                        e,
                      )
                    }
                    checked={options.some((opt) => opt.option_id === item.id)}
                  />
                  <label htmlFor={`${item.price}`}>{item.name}</label>
                </div>
                <p>+{item.price.toLocaleString('ko-KR')}원</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default StudioMenuDetailInfo;

const MenuInfoWrapperStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 1.8rem;
`;

const MenuInfoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  ${mqMin(breakPoints.pc)} {
    gap: 1.4rem;
  }

  .menuInfoItem {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    ${TypoBodyMdR}

    ${mqMin(breakPoints.pc)} {
      justify-content: flex-start;
      gap: 0;
    }

    & h3 {
      color: ${variables.colors.gray800};
      background-position: left;
      padding-left: 2rem;
      background-repeat: no-repeat;
      background-size: 1.6rem;

      ${mqMin(breakPoints.pc)} {
        display: inline-block;
        width: 26.5rem;
      }

      &.time {
        background-image: url(/img/icon-clock.svg);
      }
      &.camera {
        background-image: url(/img/icon-camera-roll.svg);
      }
      &.crop {
        background-image: url(/img/icon-crop.svg);
      }
      &.folder {
        background-image: url(/img/icon-folder.svg);
      }
    }

    & p {
      ${mqMin(breakPoints.pc)} {
        flex-grow: 1;
      }
    }
  }
`;

const TotalPriceStyle = css`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.8rem 0;

  ${mqMin(breakPoints.pc)} {
    justify-content: flex-start;
    gap: 0;
  }

  & h3 {
    ${TypoTitleXsM}
    ${mqMin(breakPoints.pc)} {
      display: inline-block;
      width: 26.5rem;
    }
  }
  & p {
    ${TypoTitleXsB}
    ${mqMin(breakPoints.pc)} {
      flex-grow: 1;
    }
  }
`;

const AddOptionsWrapperStyle = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  ${mqMin(breakPoints.pc)} {
    justify-content: flex-start;
  }

  & h3 {
    padding: 1.8rem 0;
    ${TypoTitleXsM}
    ${mqMin(breakPoints.pc)} {
      display: inline-block;
      width: 26.5rem;
    }
  }

  .optionList {
    display: flex;
    flex-direction: column;
    padding: 1.2rem 0;
  }
`;

const AddOptionsListStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.4rem;

  ${mqMin(breakPoints.pc)} {
    padding-bottom: 3rem;
  }

  & li {
    display: flex;
    align-items: center;
    ${TypoBodyMdM}
  }

  & div {
    ${mqMin(breakPoints.pc)} {
      display: inline-block;
      width: 26.5rem;
    }
  }

  & p {
    margin-left: auto;
    ${TypoBodyMdSb}
    ${mqMin(breakPoints.pc)} {
      margin-left: 0;
      flex-grow: 1;
    }
  }
`;
