import Axios from '@axios';

const AuthService = {
  login: (body: LoginBody) => {
    return Axios.post('/auth/login', body);
  },
  register: (body: RegisterBody) => {
    return Axios.post('/auth/register', body);
  },
  logout: () => {
    return Axios.post('/auth/logout');
  },
  me: () => {
    return Axios.get('/user/me');
  },
  reservations: () => {
    return Axios.get('/user/reservations');
  },
};

export default AuthService;
