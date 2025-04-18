/** @jsxImportSource @emotion/react */
import Bookmark from '@components/Bookmark/Bookmark';
import ShareButton from '@components/Share/ShareButton';
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import {
  DividerStyle,
  TypoBodyMdR,
  TypoBodySmR,
  TypoTitleMdSb,
  TypoTitleXsR,
  TypoTitleXsSb,
} from '@styles/Common';
import variables from '@styles/Variables';
import { useMediaQuery } from 'react-responsive';
import { IStudioDetail } from 'types/types';
import StudioOptions from './StudioOptions';

interface IStudioInfo {
  id: string | undefined;
  data: IStudioDetail;
}

const StudioInfo = ({ data, id }: IStudioInfo) => {
  let today = new Date();
  const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  return (
    <div
      css={css`
        ${mqMin(breakPoints.pc)} {
          position: sticky;
          top: 13.8rem;
          right: 0;
          width: 100%;
        }
      `}
    >
      {/* 스튜디오 정보 */}
      <div css={StudioInfoTitleStyle}>
        <div>
          <h2>{`${data.name}`}</h2>
          <div className="rating">
            <div className="rating-img">
              <img src="/img/icon-rating.svg" alt="리뷰 평점" />
            </div>

            <p>{`${data.rating}`}</p>
            <p>{`(${data.review_count}개의 리뷰)`}</p>
          </div>
        </div>
        <div css={SocialActionsStyle}>
          <ShareButton
            title={data.name}
            description={data.description}
            imageUrl={data.portfolios[0]?.url}
            webUrl={window.location.href}
          />
          <Bookmark id={Number(id)} count={data.bookmark_count} isBookmarked={false} />
        </div>
      </div>
      <div css={StudioInfoStyle({ isPc })}>
        <dl>
          <div>
            <dt>
              <img className="img-time" src="/img/icon-clock.svg" alt="영업시간" />
            </dt>
            <dd>
              <div className="openStatus">
                {data && data.open ? (
                  <>
                    <p>영업중</p>
                    <time>
                      {data.openingHours[dayIndex].openTime.slice(0, 5)} -{' '}
                      {data.openingHours[dayIndex].closeTime.slice(0, 5)}
                    </time>
                  </>
                ) : (
                  <p>영업 종료</p>
                )}
              </div>
            </dd>
          </div>

          <div>
            <dt>
              <img className="img-address" src="/img/icon-location.svg" alt="주소" />
            </dt>
            <dd>
              <p>
                {`${data.address}` === 'undefined'
                  ? '주소 수집중'
                  : `${data.addressSi} ${data.addressGu} ${data.address}`}
              </p>
            </dd>
          </div>
          <div>
            <dt>
              <img className="img-contact" src="/img/icon-call-gray700.svg" alt="연락처" />
            </dt>
            <dd>
              <p>{`${data.phone}`}</p>
            </dd>
          </div>
        </dl>
      </div>

      {/* 홈 기본정보 - 매장 정보 */}
      {isPc && <StudioOptions data={data} />}
    </div>
  );
};

export default StudioInfo;

const StudioInfoTitleStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  ${mqMin(breakPoints.pc)} {
    padding-top: 2rem;
  }

  & > div {
    min-width: 0;

    & > h2 {
      ${TypoTitleMdSb}
      margin-bottom: 0.4rem;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: break-all;
    }

    & > .rating {
      display: flex;
      align-items: center;
      gap: 0.2rem;

      .rating-img {
        padding: 0.2rem;
        width: 1.6rem;
        height: 1.6rem;
        box-sizing: border-box;

        img {
          width: 1.2rem;
          height: 1.2rem;
        }
      }

      & p {
        ${TypoBodySmR}
      }

      & > p + p {
        color: ${variables.colors.gray800};
      }
    }
  }

  ${mqMin(breakPoints.pc)} {
    margin-bottom: 2rem;

    & > div {
      & > .rating {
        & p {
          ${TypoBodyMdR}
        }
      }
    }
  }
`;

const SocialActionsStyle = css`
  flex-shrink: 0;
  display: flex;
  gap: 2.4rem;
`;

const StudioInfoStyle = ({ isPc }: { isPc: boolean }) => css`
  position: relative;
  margin-bottom: ${isPc ? '6rem' : 0};

  dl {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    div {
      display: flex;
      gap: 0.8rem;

      dt {
        flex-shrink: 0;
        width: 2.6rem;
        height: 2.6rem;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          &.img-time {
            width: 1.7rem;
            height: 1.7rem;
          }

          &.img-address {
            width: 1.5rem;
            height: 1.9rem;
          }

          &.img-contact {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }

      dd {
        display: flex;
        align-items: center;

        p {
          ${TypoTitleXsR}
        }

        & > .openStatus {
          display: flex;

          & > p {
            ${TypoTitleXsSb}
            margin-right: 0.8rem;
          }

          & > time {
            ${TypoTitleXsR}
          }
        }
      }
    }

    ${!isPc && DividerStyle}
  }

  ${mqMin(breakPoints.pc)} {
    dl {
      div {
        dd {
          p {
            ${TypoTitleXsR}
          }

          & > .openStatus {
            & > p {
              ${TypoTitleXsSb}
            }

            & > time {
              ${TypoTitleXsR}
            }
          }
        }
      }

      ${!isPc && DividerStyle}
    }
  }
`;
