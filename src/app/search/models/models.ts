export interface ICity {
  country: string;
  is_capital: boolean;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
}

export interface IDay {
  name: string;
  date: string;
}

export interface IRequestSearch {
  fromLatitude: number;
  fromLongitude: number;
  toLatitude: number;
  toLongitude: number;
  time?: number;
}

interface Geolocation {
  latitude: number;
  longitude: number;
}

interface Station {
  stationId: number;
  city: string;
  geolocation: Geolocation;
}

interface Route {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}

interface Schedule {
  rideId: number;
  segments: Segment[];
}

interface Segment {
  time: string[];
  price: { [key: string]: number };
  occupiedSeats: number[];
}

export interface ITrip {
  from: Station;
  to: Station;
  routes: Route[];
}

export interface ICardFilter {
  id: number;
  date: string;
  dayName: string;
}
