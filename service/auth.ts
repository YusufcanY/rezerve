import Axios from '@axios';

const AuthService = {
  login: (email: string, password: string) => {
    return Axios.post('/auth/login', { email, password });
  },
  register: (email: string, password: string) => {
    return Axios.post('/auth/register', { email, password });
  },
  logout: () => {
    return Axios.post('/auth/logout');
  },
};

export default AuthService;
