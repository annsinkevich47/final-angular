export interface Segment {
  time: string[];
  price: { [key: string]: number };
}

export interface Schedule {
  rideId: number;
  segments: Segment[];
}

export interface RideType {
  id: number | null;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}

export enum timeType {
  DepartureFromPrevStation = 0,
  ArrivalAtNextStation = 1,
}
