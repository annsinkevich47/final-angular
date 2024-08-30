export interface IStationItem {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: IConnectedStation[];
}

interface IConnectedStation {
  id: number;
  distance: number;
}
