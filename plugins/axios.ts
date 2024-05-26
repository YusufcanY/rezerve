import axios from 'axios';
import Cookie from 'js-cookie';

const Axios = axios.create({
  baseURL: 'http://localhost:8000',
});

// Add a request interceptor
Axios.interceptors.request.use(
  (config) => {
    // Do something before the request is sent
    // For example, add your auth token here
    const token = Cookie.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
Axios.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  },
);

export default Axios;
