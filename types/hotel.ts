type Room = {
  name: string;
  amenities: string[];
  occupantCount: number;
  price: number;
  squareMeters: number;
};
type Hotel = {
  _id: string;
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
  images: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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

type RandomHotelResponse = {
  success: boolean;
  hotels: Hotel[];
};
type PopularHotelsResponse = {
  success: boolean;
  hotels: Hotel[];
};
type SearchResponse = {
  success: boolean;
  hotels: Hotel[];
};
