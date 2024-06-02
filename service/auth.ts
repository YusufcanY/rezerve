import Axios from '@axios';

const AuthService = {
  login: (body: LoginBody) => {
    return Axios.post<LoginResponse>('/auth/login', body).then((res) => res.data);
  },
  register: (body: RegisterBody) => {
    return Axios.post<RegisterResponse>('/auth/register', body).then((res) => res.data);
  },
  logout: () => {
    return Axios.post('/auth/logout').then((res) => res.data);
  },
  me: () => {
    return Axios.get<MeResponse>('/user/me').then((res) => res.data);
  },
  reservations: () => {
    return Axios.get<ReservationsResponse>('/user/reservations').then((res) => res.data);
  },
};

export default AuthService;
