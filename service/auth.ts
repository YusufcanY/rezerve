import Axios from '@axios';

const AuthService = {
  login: (body: LoginBody) => {
    return Axios.post('/auth/login', body);
  },
  register: (body: RegisterBody) => {
    return Axios.post<RegisterResponse>('/auth/register', body);
  },
  logout: () => {
    return Axios.post('/auth/logout');
  },
  me: () => {
    return Axios.get<MeResponse>('/user/me');
  },
  reservations: () => {
    return Axios.get('/user/reservations');
  },
};

export default AuthService;
