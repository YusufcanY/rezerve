import Axios from '@axios';

const AuthService = {
  random: () => {
    return Axios.get('/hotel/random');
  },
  hotel: (id: string) => {
    return Axios.get('/hotel/' + id);
  },
  search: (body: SearchBody) => {
    return Axios.post('/hotel/search', body);
  },
  popularHotels: () => {
    return Axios.get('/hotel/highly-rated');
  },
  createHotel: (body: CreateHotelBody) => {
    return Axios.post('/hotel', body);
  },
  addImagesToHotel: (id: string, body: AddImageBody) => {
    return Axios.post('/hotel/' + id, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteHotel: (id: string) => {
    return Axios.delete('/hotel/' + id);
  },
  createReservation: (body: CreateReservationBody) => {
    return Axios.post('/reservation', body);
  },
};

export default AuthService;
