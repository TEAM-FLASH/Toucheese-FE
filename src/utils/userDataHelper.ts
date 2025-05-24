import { useUserStore } from '@store/useUserStore';

export const createSafeUserObject = (
  newData: {
    username?: string | null;
    phone?: string | null;
    email?: string | null;
  } = {},
) => {
  // 현재 userStore 상태 가져오기
  const currentUser = useUserStore.getState();

  // 타입 안전한 객체 (setUser 함수에 전달가능 형태)
  return {
    accessToken: currentUser.accessToken || '',
    email: newData.email !== undefined ? newData.email || '' : currentUser.email || '',
    phone: newData.phone !== undefined ? newData.phone || '' : currentUser.phone || '',
    registration: currentUser.registration || 'EMAIL',
    user_id: currentUser.user_id || 0,
    username: newData.username !== undefined ? newData.username || '' : currentUser.username || '',
  };
};
