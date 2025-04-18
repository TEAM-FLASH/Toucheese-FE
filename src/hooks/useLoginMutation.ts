import { useUserStore } from '@store/useUserStore';
import { useMutation } from '@tanstack/react-query';

const login = async (data: { email: string; password: string }) => {
  const response = await fetch(`${import.meta.env.VITE_TOUCHEESE_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const useLoginMutation = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data);
    },
  });
};

export default useLoginMutation;
