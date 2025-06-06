/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioMenuItem from './StudioMenuItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IMenuListRes } from 'types/types';
import Header from '@components/Header/Header';
import { Helmet } from 'react-helmet-async';
import { breakPoints, mqMin } from '@styles/BreakPoint';
import { Hidden } from '@styles/Common';

const StudioMenu = () => {
  const { _id } = useParams();
  const [data, setData] = useState<IMenuListRes[]>();

  const fetchMenu = async () => {
    const res = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/studio/detail/${_id}/menu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const fetchAndSetData = async () => {
      const result = await fetchMenu();
      setData(result);
    };

    fetchAndSetData();
  }, []);

  const StudioMenuList = data?.map((item) => (
    <StudioMenuItem key={item.id} StudioId={_id} data={item} />
  ));

  return (
    <>
      {data && (
        <Helmet>
          <title>{data[0]?.studioName} - 메뉴</title>
          <meta property="og:title" content={`${data[0]?.studioName} - 메뉴`} />
          <meta property="og:url" content={`${window.location.href}`} />
          <meta property="og:description" content="스튜디오 메뉴 목록" />
        </Helmet>
      )}
      <div css={MenuPCStyle}>
        <Header title={`${data ? data[0].studioName : ''}`} backTo="/" />
      </div>

      <h2 css={Hidden}>스튜디오 메뉴</h2>
      <StudioNavigator _id={_id || ''} />
      <div css={ItemLIstStyle}>{StudioMenuList}</div>
    </>
  );
};

export default StudioMenu;

const ItemLIstStyle = css`
  display: flex;
  flex-direction: column;
  ${mqMin(breakPoints.pc)} {
    gap: 3.4rem;
    margin-top: 3rem;
  }
`;
export const MenuPCStyle = css`
  ${mqMin(breakPoints.pc)} {
    display: none;
  }
`;
