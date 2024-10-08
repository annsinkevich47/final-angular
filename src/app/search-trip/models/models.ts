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

export interface IStateCities {
  cityFrom: string;
  cityTo: string;
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
  rideId?: number;
  segments: ISegment[];
}

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

export interface IScheduleStation {
  time: string;
  nameStation: string;
  duration: string;
}

export interface IScheduleTrip {
  routeId: number;
  rideId: number;
  scheduleStation: IScheduleStation[];
}

export interface ICardResult {
  stationFrom: IStationResult;
  stationTo: IStationResult;
  timePath: string;
  stationStart: string;
  stationEnd: string;
  occupiedSeats: number[];
  prices: number[];
  schedules: IScheduleTrip;
  carriages: string[];
  countOneCarriage: ICarriageCapacity;
  uniqueCarriages: string[];
  carriageCapacity: ICarriageCapacity;
  allClearSeats: number[];
}

export interface ITripDetail {
  carriages: string[];
  path: string[];
  rideId: number;
  schedule: ISchedule;
}

export interface ITripResult {
  uniqueCarriages: string[];
}

export interface ICarriage {
  code: string;
  name: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}

export interface ICarriageView {
  name: string;
  occupiedSeats: number[];
  countClearSeats: number;
}

export interface ICar {
  name: string;
  indexCarriage: number;
  info: ICarriage;
  infoAll: ICarriage[];
  occupiedSeats: number[];
  carriages: string[];
  numbersCar: number[];
}

export interface ICarriageCapacity {
  [key: string]: number;
}

export interface IOrder {
  rideId: number;
  seat: number;
  stationStart: number;
  stationEnd: number;
}

export interface IOrderView {
  object: IOrder;
  price: number;
  seatCar: number;
  car: number;
}

export interface IBookMsg {
  isGood: boolean;
  msg: string;
}
