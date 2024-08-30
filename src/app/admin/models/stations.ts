export default interface StationType {
  city: string;
  id?: number;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedType[];
}

export interface ConnectedType {
  id: number;
  distance: number;
}
export interface StationServer {
  city: string;
  latitude: number;
  longitude: number;
  relations: number[];
}

export interface StationResponse extends StationServer {
  id: number;
}
