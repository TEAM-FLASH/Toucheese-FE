/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StudioNavigator from '@components/Navigator/StudioNavigator';
import StudioMenuItem from './components/StudioMenuItem';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IMenuListRes } from 'types/types';
import Header from '@components/Header/Header';

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

    if (!res.ok) {
      console.error('Failed to fetch data');
    }

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

  const StudioMenuList = data?.map((item) => <StudioMenuItem key={item.id} StudioId={_id} data={item} />);
  return (
    <>
      <Header title={`${data ? data[0].studioName : ''}`} />
      <StudioNavigator _id={_id || ''} />
      <div css={ItemLIstStyle}>{StudioMenuList}</div>
    </>
  );
};

export default StudioMenu;

const ItemLIstStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 0.4rem;
`;
