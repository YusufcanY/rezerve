type Room = {
  _id: string;
  name: string;
  amenities: string[];
  occupantCount: number;
  price: number;
  squareMeters: number;
  reservedDates: { from: string; to: string }[];
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
  minPrice: number;
  rooms: Room[];
  amenities: string[];
  images: string[];
  coverImage: string;
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
  sort: {
    minPrice?: 'asc' | 'desc';
    rating?: 'desc';
  };
};

type CreateHotelBody = {
  name: string;
  description: string;
  location: {
    country: string;
    city: string;
  };
  rooms: {
    name: string;
    amenities: string[];
    occupantCount: number;
    price: number;
    squareMeters: number;
  }[];
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
type CreateHotelResponse = {
  success: boolean;
  hotel: Hotel;
};

type HotelResponse = {
  success: boolean;
  hotel: Hotel;
};

type RandomHotelResponse = {
  success: boolean;
  hotel: Hotel;
};
type PopularHotelsResponse = {
  success: boolean;
  hotels: Hotel[];
};
type SearchResponse = {
  success: boolean;
  hotels: Hotel[];
};
