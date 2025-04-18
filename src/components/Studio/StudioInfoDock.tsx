/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import variables from '@styles/Variables';
import { useParams } from 'react-router-dom';
import StudioInfo from './StudioInfo';
import { IStudioDetail } from 'types/types';

const StudioInfoDock = () => {
  const { _id } = useParams();
  const studioData = sessionStorage.getItem('studio-storage');
  const parsedData = studioData ? JSON.parse(studioData) : null;
  const data: IStudioDetail = parsedData?.state.studioDetail[Number(_id)];

  return (
    <aside
      className="pc"
      css={css`
        ${mqMin(breakPoints.pc)} {
          margin-left: auto;
          margin-right: calc(-1 * ${variables.layoutPadding});
          width: 42.4rem;
          flex-shrink: 0;
          background-color: ${variables.colors.white};
          box-shadow: inset 0.1rem 0 ${variables.colors.gray300};
          padding: 5.8rem ${variables.layoutPadding};
          box-sizing: border-box;
          z-index: 9;
        }
      `}
    >
      {data && <StudioInfo data={data} id={_id} />}
    </aside>
  );
};

export default StudioInfoDock;
