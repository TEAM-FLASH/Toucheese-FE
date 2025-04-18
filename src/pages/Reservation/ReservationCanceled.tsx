import { useGetReservationData } from '@hooks/useGetReservationData';
import useToast from '@hooks/useToast';
import { useNavigate, useParams } from 'react-router-dom';
import CompleteMessage from './components/CompleteMessage';

const ReservationCanceled = () => {
  const { _id } = useParams() as { _id: string };
  const userState = JSON.parse(localStorage.getItem('userState') || '{}');
  const accessToken = userState.state.accessToken;
  const openToast = useToast();
  const navigate = useNavigate();

  const { data, error } = useGetReservationData(_id, accessToken);

  if (error) {
    openToast('로그인 정보가 유효하지 않습니다! 다시 로그인해주세요!');
    navigate('/user/auth');
  }

  return <>{data && <CompleteMessage type="canceled" data={data} resetInfo={() => {}} />}</>;
};

export default ReservationCanceled;
