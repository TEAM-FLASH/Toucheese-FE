/** @jsxImportSource @emotion/react */
import Loading from '@components/Loading/Loading';
import StudioInfoDock from '@components/Studio/StudioInfoDock';
import { css } from '@emotion/react';
import { useGetStudioDetail } from '@hooks/useGetStudioDetail';
import useStudioDataStore from '@store/useStudioDataStore';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const StudioDetailLayout = () => {
  const { _id } = useParams();
  const { setStudioDetail } = useStudioDataStore();

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
            <Outlet />
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
