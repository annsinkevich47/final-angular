export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedStations[];
}
export interface ConnectedStations {
  id: number;
  distance: number;
}
