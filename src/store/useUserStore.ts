import { IUser, IUserRes } from 'types/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { decryptUserData, encryptUserData } from '@utils/encryptUserData';

export interface IUserEncrypted {
  encryptedEmail: string | null;
  encryptedPhone: string | null;
  encryptedUsername: string | null;
}

export interface UserAction {
  setUser: (user: IUserRes) => void;
  resetUser: () => void;
}

export const defaultUserState: IUser & IUserEncrypted = {
  accessToken: null,
  email: null,
  phone: null,
  registration: null,
  user_id: null,
  username: null,
  encryptedEmail: null,
  encryptedPhone: null,
  encryptedUsername: null,
};

/** 암호화 */
export const useUserStore = create(
  persist<IUser & IUserEncrypted & UserAction>(
    (set) => ({
      ...defaultUserState,
      setUser: ({ accessToken, email, phone, registration, user_id, username }) => {
        // 유저 정보 암호화 유틸함수 호출
        const { encryptedUsername, encryptedEmail, encryptedPhone } = encryptUserData({
          email,
          phone,
          username,
        });

        set(() => ({
          // 상태에 복호화된 값 저장
          encryptedEmail: encryptedEmail,
          encryptedPhone: encryptedPhone,
          encryptedUsername: encryptedUsername,
          accessToken,
          email,
          phone,
          username,
          registration,
          user_id,
        }));
      },
      resetUser: () => {
        localStorage.removeItem('userState');
        set(defaultUserState);
      },
    }),
    {
      name: 'userState',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        ({
          encryptedEmail: state.encryptedEmail,
          encryptedPhone: state.encryptedPhone,
          encryptedUsername: state.encryptedUsername,
          accessToken: state.accessToken,
          registration: state.registration,
          user_id: state.user_id,
        }) as IUser & IUserEncrypted & UserAction,
    },
  ),
);

/** 복호화 */
export const loadUserFromStorage = () => {
  const { encryptedEmail, encryptedPhone, encryptedUsername, ...rest } = useUserStore.getState();

  if (encryptedEmail && encryptedPhone && encryptedUsername) {
    try {
      const { email, phone, username } = decryptUserData({
        encryptedEmail,
        encryptedPhone,
        encryptedUsername,
      });

      useUserStore.setState({
        ...rest,
        email,
        phone,
        username,
      });
    } catch (error) {
      console.error('복호화 오류:', error);
    }
  }
};
