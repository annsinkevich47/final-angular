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
  )
);
