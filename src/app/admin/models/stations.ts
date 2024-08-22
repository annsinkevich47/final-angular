export default interface StationType {
  city: string;
  id: number;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedType[];
}

interface ConnectedType {
  id: number;
  distance: number;
}
