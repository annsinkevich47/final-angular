type OrderStatus = 'active' | 'completed' | 'rejected' | 'canceled';

interface ISegments {
  time: string[];
  price: Record<string, number>;
}

export interface IOrderItem {
  id: number;
  rideId: number;
  routeId: number;
  seatId: number;
  userId: number;
  status: OrderStatus;
  path: number[];
  carriages: string[];
  stationStart: number;
  stationEnd: number;
  schedule: {
    segments: ISegments[];
  };
}

export interface ITransformedOrderItem {
  startStationName: string;
  startTime: string;
  endStationName: string;
  endTime: string;
  durationTime: string;
  carriageType: string;
  carNumber: number | string;
  seatNumber: number | string;
}
