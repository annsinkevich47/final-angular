import { ConnectedStations, Station } from '../models/stations-response.model';

export function getStationsFromId(
  connectedTo: ConnectedStations[],
  stations: Station[]
) {
  return connectedTo
    .map(connection => {
      const station = stations.find(station => station.id === connection.id);
      if (station) {
        return {
          id: station.id,
          city: station.city,
          latitude: station.latitude,
          longitude: station.longitude,
          connectedTo: station.connectedTo,
        };
      }
      return null;
    })
    .filter(station => station !== null) as Station[];
}
