import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

type State = {
  user: User | null;
  token: string | null;
};

type Actions = {
  updateUser: (socket: State['user']) => void;
  updateToken: (socket: State['token']) => void;
  reset: () => void;
};

const initialState: State = {
  user: null,
  token: null,
};

const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      updateUser: (user) => set(() => ({ user })),
      updateToken: (token) => set(() => ({ token })),
      reset: () => set(() => ({ ...initialState })),
    }),
    {
      name: 'user',
      storage: {
        getItem: () => {
          const cookie = Cookies.get('user');
          return cookie ? JSON.parse(cookie) : null;
        },
        setItem: (key, value) => {
          Cookies.set(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          Cookies.remove(key);
        },
      },
    },
  ),
);

export default useUserStore;
