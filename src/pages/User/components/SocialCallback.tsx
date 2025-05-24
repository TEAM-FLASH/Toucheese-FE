import Loading from '@components/Loading/Loading';
import useToast from '@hooks/useToast';
import { useUserStore } from '@store/useUserStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SocialCallback = ({ type }: { type: 'kakao' | 'google' }) => {
  const [code, setCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const openToast = useToast();

  useEffect(() => {
    const codeParams = new URLSearchParams(window.location.search).get('code');

    if (codeParams) {
      setCode(codeParams);
    }
  }, []);

  useEffect(() => {
    if (code) {
      handleLogin(code);
    }
  }, [code]);

  const handleLogin = async (code: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_TOUCHEESE_API}/user/auth/${type}/callback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
          }),
        },
      );

      const data = await response.json();

      if (data.accessToken) {
        setUser(data);
        openToast('로그인 성공!');
        navigate('/', { replace: true });
      } else {
        navigate('/user/AuthVerification', {
          replace: true,
          state: data,
        });
      }

      setIsLoading(false);
    } catch (err) {
      console.error(`${type === 'kakao' ? '카카오' : '구글'} 로그인 에러`, err);
      navigate('/user/auth');
    }
  };

  return <>{isLoading && <Loading size="big" phrase="로그인 중입니다..." />}</>;
};

export default SocialCallback;
