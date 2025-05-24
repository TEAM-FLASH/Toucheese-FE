/** @jsxImportSource @emotion/react */
import Bookmark from '@components/Bookmark/Bookmark';
import { getMinPrice } from '@components/Studio/StudioItem';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { TypoBodyMdR, TypoBodySmR, TypoTitleSmS } from '@styles/Common';
import variables from '@styles/Variables';
import { KeyboardEvent } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { IStudioItem } from 'types/types';

const BookmarkedStudioItem = ({
  item,
  handleUnbookmark,
}: {
  item: IStudioItem;
  handleUnbookmark: () => void;
}) => {
  const navigate = useNavigate();
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (!isPc) return;

    if (e.code === 'Enter') {
      navigate(`/studio/${item.id}`);
    }
  };

  return (
    <li css={listStyle}>
      <a
        css={css`
          display: flex;
          gap: ${variables.layoutPadding};
        `}
        href={`/studio/${item.id}`}
        onKeyDown={handleKeyDown}
      >
        <div css={imgStyle} className="image-container">
          <img
            src={item.portfolios.length > 0 ? item.portfolios[0].url : '/img/img-replace-01.svg'}
            alt={`${item.name} 대표 이미지`}
          />
        </div>

        <div css={infoStyle}>
          <div className="info">
            <div className="info-title">
              <h3>{item.name}</h3>
              <div className="info-rating">
                <div>
                  <img src="/img/icon-star-filled.svg" alt="평점" />
                </div>
                <p>{item.rating.toFixed(1)}</p>
                <p className="info-rating-review">({item.review_count}개 평가)</p>
              </div>
            </div>

            <ul className="info-detail">
              <li>
                <div>
                  <img className="price" src="/img/icon-price.svg" alt="가격" />
                </div>
                <p>{`${getMinPrice(item.menus)}원~`}</p>
              </li>
              <li>
                <div>
                  <img className="location" src="/img/icon-location.svg" alt="주소" />
                </div>
                <p>{`${item.addressGu} ${item.address}`}</p>
              </li>
              <li>
                <div>
                  <img className="time" src="/img/icon-clock.svg" alt="영업 시간" />
                </div>
                <p>{`${item.open_time.slice(0, -3)} - ${item.close_time.slice(0, -3)}`}</p>
              </li>
            </ul>
          </div>

          <div className="info-bookmark">
            <Bookmark
              id={item.id}
              count={item.bookmark_count}
              isBookmarked={true}
              type="bookmark"
              handleUnbookmark={handleUnbookmark}
            />
          </div>
        </div>
      </a>
    </li>
  );
};

export default BookmarkedStudioItem;

const listStyle = css`
  cursor: pointer;
  padding: 1.6rem 0;
  box-shadow: inset 0 -1px ${variables.colors.gray300};

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    padding-bottom: 0;
    box-shadow: unset;
  }
`;

const imgStyle = css`
  flex-shrink: 0;
  width: 9.4rem;
  height: 11.8rem;

  ${mqMin(breakPoints.pc)} {
    width: 14.1rem;
    height: 17.7rem;
  }

  img {
    aspect-ratio: 94 / 118;
    object-fit: cover;

    ${mqMin(breakPoints.pc)} {
      aspect-ratio: 141 / 177;
    }
  }
`;

const infoStyle = css`
  flex-grow: 1;

  display: flex;
  gap: ${variables.layoutPadding};

  ${mqMin(breakPoints.pc)} {
    align-items: center;
  }

  .info {
    flex-grow: 1;

    .info-title {
      margin-bottom: 1rem;

      ${mqMin(breakPoints.pc)} {
        margin-bottom: 1.2rem;
      }

      h3 {
        ${TypoTitleSmS}
        margin-bottom: 2px;
      }

      .info-rating {
        display: flex;
        gap: 2px;
        align-items: center;

        div {
          width: 1.6rem;
          height: 1.6rem;
          align-items: center;
          justify-content: center;

          img {
            width: 1.3rem;
            height: 1.3rem;
          }
        }

        p {
          ${TypoBodyMdR}

          &.info-rating-review {
            color: ${variables.colors.gray800};
          }
        }
      }
    }

    .info-detail {
      li {
        margin-bottom: 0.4rem;
        display: flex;
        align-items: center;
        gap: 2px;

        ${mqMin(breakPoints.pc)} {
          margin-bottom: 0.8rem;
        }

        div {
          width: 1.6rem;
          height: 1.6rem;
          display: flex;
          align-items: center;
          justify-content: center;

          img.price {
            width: 1.3rem;
            height: 1.1rem;
          }

          img.location {
            width: 1.1rem;
            height: 1.3rem;
          }

          img.time {
            width: 1.3rem;
            height: 1.3rem;
          }
        }

        p {
          ${TypoBodySmR}
        }
      }
    }
  }

  .info-bookmark {
    flex-shrink: 0;
    margin-left: auto;
  }
`;
