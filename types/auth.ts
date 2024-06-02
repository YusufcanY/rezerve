type Reservation = {
  _id: string;
  user: string;
  hotel: Hotel;
  room: string;
  occupantCount: {
    adult: number;
    children: number;
  };
  dates: {
    from: string;
    to: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type RegisterBody = {
  name: string;
  email: string;
  password: string;
};
type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  token: string;
  user: User;
};
type LoginError = {
  success: boolean;
  error: string;
};

type RegisterResponse = {
  success: boolean;
  user: User;
  token: string;
};

type ReservationsResponse = {
  success: boolean;
  pastReservations: Reservation[];
  upcomingReservations: Reservation[];
  currentReservations: Reservation[];
};
