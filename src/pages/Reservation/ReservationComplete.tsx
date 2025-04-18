import { useGetReservationData } from '@hooks/useGetReservationData';
import useToast from '@hooks/useToast';
import useReservationStore from '@store/useReservationStore';
import { convertToDateFormat, today, useSelectDateStore } from '@store/useSelectDateStore';
import { useSelectTimeStore } from '@store/useSelectTimeStore';
import { useLocation, useNavigate } from 'react-router-dom';
import CompleteMessage from './components/CompleteMessage';

const ReservationComplete = () => {
  const { clearReservationInfo } = useReservationStore();
  const { setDate } = useSelectDateStore();
  const { setTime } = useSelectTimeStore();
  const resetReservationInfo = () => {
    clearReservationInfo();
    setDate(convertToDateFormat(today));
    setTime('reset');
  };

  const openToast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const userState = JSON.parse(localStorage.getItem('userState') || '{}');
  const accessToken = userState.state.accessToken;

  const query = new URLSearchParams(location.search);
  const reservationId = query.get('reservationId');
  const resultCode = query.get('resultCode');

  if (resultCode === 'UserCancel') {
    window.history.go(-2);
    sessionStorage.setItem('skipLoading', 'true');
    return null;
  }

  if (!reservationId) {
    throw new Error('예약 id가 없습니다!');
  }

  const { data, error } = useGetReservationData(reservationId, accessToken);

  if (error) {
    openToast('로그인 정보가 유효하지 않습니다! 다시 로그인해주세요!');
    navigate('/user/auth');
  }

  return (
    <>{data && <CompleteMessage type="reserved" data={data} resetInfo={resetReservationInfo} />}</>
  );
};

export default ReservationComplete;
