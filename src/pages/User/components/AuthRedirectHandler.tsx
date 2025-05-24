import Loading from '@components/Loading/Loading';
import { useTempStore } from '@store/useTempStore';
import { decryptUserData } from '@utils/encryptUserData';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirectHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const stored = localStorage.getItem('temp-user-data');
    const encryptedUser = stored ? JSON.parse(stored) : null;

    if (encryptedUser) {
      const { phone, username, email } = decryptUserData({
        encryptedPhone: encryptedUser.encryptedPhone || null,
        encryptedUsername: encryptedUser.encryptedUsername || null,
        encryptedEmail: encryptedUser.encryptedEmail || null,
      });

      const setTempData = useTempStore.getState().setTempData;

      setTempData({
        username: username ?? null,
        phone: phone ?? null,
        email: email ?? null,
      });

      localStorage.removeItem('temp-user-data');
      navigate('/user/profile/edit');
    } else {
      console.error('로컬스토리지에 저장된 데이터가 없습니다.');
      navigate('/user/profile/edit');
    }
  }, []);

  return <Loading size="small" phrase="본인인증을 완료중입니다" />;
};

export default AuthRedirectHandler;
