/** @jsxImportSource @emotion/react */
import Loading from '@components/Loading/Loading';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioInfoDock from '@components/Studio/StudioInfoDock';
import { css } from '@emotion/react';
import { useGetStudioDetail } from '@hooks/useGetStudioDetail';
import useStudioDataStore from '@store/useStudioDataStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { bg100vw, PCLayout } from '@styles/Common';
import variables from '@styles/Variables';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Outlet, useParams } from 'react-router-dom';

const StudioDetailLayout = () => {
  const { _id } = useParams() as { _id: string };
  const { setStudioDetail } = useStudioDataStore();
  const isPc = useMediaQuery({ minWidth: breakPoints.pc });

  const { data } = useGetStudioDetail(`${_id}`);

  useEffect(() => {
    if (data) {
      setStudioDetail(`${_id}`, data);
    }
  }, [data]);

  return (
    <>
      {data ? (
        <main
          css={css`
            ${mqMin(breakPoints.pc)} {
              ${PCLayout}
              display: flex;
              gap: 1.6rem;
            }
          `}
        >
          <section
            css={css`
              ${mqMin(breakPoints.pc)} {
                flex-grow: 1;
              }
            `}
          >
            {isPc && (
              <div
                css={css`
                  ${PCLayout}
                  ${bg100vw(variables.colors.white)}
                  background-color: ${variables.colors.white};
                  position: fixed;
                  top: 8rem;
                  left: 0;
                  right: 0;
                  z-index: 9;
                  padding-left: ${variables.layoutPadding};
                  box-shadow: inset 0 -0.1rem ${variables.colors.gray300};

                  ::before {
                    left: 0;
                    transform: translateX(-100%);
                    box-shadow: inset 0 -0.1rem ${variables.colors.gray300};
                  }
                `}
              >
                <StudioNavigator _id={_id} type="pcOnly" />
              </div>
            )}
            <div
              css={css`
                ${mqMin(breakPoints.pc)} {
                  padding-top: 5.8rem;
                }
              `}
            >
              <Outlet />
            </div>
          </section>

          {/* PC용 */}
          <StudioInfoDock />
        </main>
      ) : (
        <Loading size="big" phrase="스튜디오 정보를 불러오고 있습니다." />
      )}
    </>
  );
};

export default StudioDetailLayout;
