/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ReservationNpayCallback = () => {
  const { _id } = useParams<{ _id?: string }>();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const SuccessReturnUrl = `${baseUrl}/studio/${_id}/reservation/complete`;
  const FaildReturnUrl = `${baseUrl}/studio/${_id}/reservation/payment`;

  const queryParams = new URLSearchParams(window.location.search);
  const resultCode = queryParams.get('resultCode');
  const studioId = queryParams.get('studioId');
  const menuID = queryParams.get('menuID');
  const merchantUserKey = queryParams.get('merchantUserKey');
  const optionIds = queryParams.get('optionIds')?.split(',') || [];
  const visitorName = queryParams.get('visitorName');
  const visitorPhone = queryParams.get('visitorPhone');
  const requests = queryParams.get('requests');
  const totalPrice = queryParams.get('totalPrice');
  const paymentMethod = queryParams.get('paymentMethod');
  const date = queryParams.get('date');
  const startTime = queryParams.get('startTime');

  useEffect(() => {
    if (!baseUrl || !_id) {
      console.error('baseUrl 또는 _id가 없습니다.');
      return;
    }

    sessionStorage.setItem('skipLoading', 'true');

    if (resultCode === 'UserCancel' || resultCode === 'TimeExpired') {
      window.location.href = FaildReturnUrl;
    } else {
      fetch(`${import.meta.env.VITE_TOUCHEESE_API}/reservation/action`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_uid: merchantUserKey,
          studioId: studioId,
          menuID: menuID,
          additionalOptionId: optionIds,
          visitingCustomerName: visitorName,
          visitingCustomerPhone: visitorPhone,
          note: requests,
          totalPrice,
          paymentMethod,
          date,
          startTime,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('결제 검증 성공');
            window.location.href = SuccessReturnUrl;
          } else {
            console.error('결제 검증 실패');
            alert('결제가 실패하였습니다. 관리자에게 문의해주세요.');
            window.location.href = FaildReturnUrl;
          }
        })
        .catch((error) => {
          console.error('결제 요청 중 오류 발생:', error);
          window.location.href = FaildReturnUrl;
        });
    }
  }, [_id, baseUrl, resultCode]);

  return <></>;
};

export default ReservationNpayCallback;
