import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StationState } from '../reducers/stations.reducer';

export const selectStationState =
  createFeatureSelector<StationState>('station');

export const selectAllStations = createSelector(
  selectStationState,
  (state: StationState) => state.stations
);
