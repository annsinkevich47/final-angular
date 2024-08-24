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

interface IGeolocation {
  latitude: number;
  longitude: number;
}

interface IStation {
  stationId: number;
  city: string;
  geolocation: IGeolocation;
}

export interface IRoute {
  id: number;
  path: number[];
  carriages: string[];
  schedule: ISchedule[];
}

export interface ISchedule {
  rideId: number;
  segments: ISegment[];
}

export const ArrayTypePrices = [
  'carriage1',
  'carriage2',
  'carriage3',
  'carriage4',
  'carriage5',
  'carriage6',
];

interface ISegment {
  time: string[];
  price: { [key: string]: number };
  occupiedSeats: number[];
}

export interface ITrip {
  from: IStation;
  to: IStation;
  routes: IRoute[];
}

export interface ICardFilter {
  id: number;
  date: string;
  dayName: string;
  dateBase: string;
}

export interface IStationResult {
  id: number;
  name: string;
  date: string;
  day: string;
  time: string;
  timeDay: string;
}

interface IConnection {
  id: number;
  distance: number;
}

export interface IStationObj {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: IConnection[];
}

export interface IScheduleTrip {
  time: string;
  nameStation: string;
  duration: string;
}

export interface ICardResult {
  stationFrom: IStationResult;
  stationTo: IStationResult;
  timePath: string;
  stationStart: string;
  stationEnd: string;
  occupiedSeats: number[];
  prices: number[];
  schedules: IScheduleTrip[];
}
