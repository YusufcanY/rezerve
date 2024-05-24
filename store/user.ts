import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

type State = {
  user: User | null;
  token: string | null;
  isUserLoggedIn: boolean;
};

type Actions = {
  updateUser: (user: State['user']) => void;
  updateToken: (token: State['token']) => void;
  reset: () => void;
};

const initialState: State = {
  user: null,
  token: null,
  isUserLoggedIn: false,
};

const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      updateUser: (user) => {
        set((state) => ({ user, isUserLoggedIn: !!user && !!state.token }));
      },
      updateToken: (token) => {
        set((state) => ({ token, isUserLoggedIn: !!state.user && !!token }));
      },
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
