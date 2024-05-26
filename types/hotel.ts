type Room = {
  name: string;
  amenities: string[];
  occupantCount: number;
  price: number;
  squareMeters: number;
};
type SearchBody = {
  query: string;
  rating: number;
  dates: {
    from: string;
    to: string;
  };
  guestCount: number;
  amenities: string[];
};

type CreateHotelBody = {
  name: string;
  description: string;
  rating: number;
  location: {
    country: string;
    city: string;
  };
  maxOccupantCount: number;
  rooms: Room[];
  amenities: string[];
};

type AddImageBody = {
  cover: File;
  images: File[];
};

type CreateReservationBody = {
  hotel: string;
  room: string;
  occupantCount: {
    adult: number;
    children: number;
  };
  dates: {
    from: string;
    to: string;
  };
};
