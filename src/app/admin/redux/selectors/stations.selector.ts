import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StationState } from '../reducers/stations.reducer';

export const selectStationState =
  createFeatureSelector<StationState>('station');

export const selectAllStations = createSelector(
  selectStationState,
  (state: StationState) => {
    return state.stations.map(station => ({
      ...station,
      connectedTo: station.connectedTo.filter(connect =>
        state.stations.some(s => s.id === connect.id),
      ),
    }));
  },
);
export const selectErrorStationId = createSelector(
  selectStationState,
  (state: StationState) => state.error,
);
