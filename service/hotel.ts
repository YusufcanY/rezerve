import Axios from '@axios';

const HotelService = {
  random: () => {
    return Axios.get<RandomHotelResponse>('/hotel/random').then((res) => res.data);
  },
  hotel: (id: string) => {
    return Axios.get('/hotel/' + id).then((res) => res.data);
  },
  search: (body: SearchBody) => {
    return Axios.post<SearchResponse>('/hotel/search', body).then((res) => res.data);
  },
  popularHotels: () => {
    return Axios.get<PopularHotelsResponse>('/hotel/highly-rated').then((res) => res.data);
  },
  createHotel: (body: CreateHotelBody) => {
    return Axios.post('/hotel', body).then((res) => res.data);
  },
  addImagesToHotel: (id: string, body: AddImageBody) => {
    return Axios.post('/hotel/' + id, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data);
  },
  deleteHotel: (id: string) => {
    return Axios.delete('/hotel/' + id).then((res) => res.data);
  },
  createReservation: (body: CreateReservationBody) => {
    return Axios.post('/reservation', body).then((res) => res.data);
  },
};

export default HotelService;
