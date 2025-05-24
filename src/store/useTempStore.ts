import { create } from 'zustand';

interface TempUserData {
  tempUsername: string | null;
  tempUserPhone: string | null;
  tempUserEmail: string | null;
  setTempData: (data: { username: string; phone: string; email: string }) => void;
  clearTempData: () => void;
}

export const useTempStore = create<TempUserData>((set) => ({
  tempUsername: null,
  tempUserPhone: null,
  tempUserEmail: null,
  setTempData: ({ username, phone, email }) =>
    set({ tempUsername: username, tempUserPhone: phone, tempUserEmail: email }),
  clearTempData: () => set({ tempUsername: null, tempUserPhone: null, tempUserEmail: null }),
}));
