import { createReducer, on } from '@ngrx/store';

import { Station } from '../../../shared/models/stations-response.model';
import * as StationActions from '../actions/stations.actions';

export interface StationState {
  stations: Station[];
  error: unknown;
}

export const initialState: StationState = {
  stations: [],
  error: null,
};

export const stationReducer = createReducer(
  initialState,
  on(
    StationActions.loadStationsSuccess,
    (state, { stations }): StationState => ({
      ...state,
      stations,
    })
  ),
  on(
    StationActions.loadStationsFailure,
    (state, { error }): StationState => ({
      ...state,
      error,
    })
  ),
  on(
    StationActions.addStationSuccess,
    (state, { station }): StationState => ({
      ...state,
      stations: [station, ...state.stations],
    })
  ),
  on(
    StationActions.addStationFailure,
    (state, { error }): StationState => ({
      ...state,
      error,
    })
  ),
  on(
    StationActions.deleteStationSuccess,
    (state, { stationId }): StationState => ({
      ...state,
      stations: state.stations
        .filter(station => station.id !== stationId)
        .map(station => ({
          ...station,
          connectedTo: station.connectedTo.filter(
            connect => connect.id !== stationId
          ),
        })),
    })
  ),
  on(
    StationActions.deleteStationFailure,
    (state, { error }): StationState => ({
      ...state,
      error,
    })
  )
);
