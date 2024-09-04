import { createReducer, on } from '@ngrx/store';

import { RideType } from '../../models/ride';
import * as RideActions from '../actions/ride.actions';

export interface RideState extends RideType {
  error: unknown;
}

export const initialState: RideState = {
  id: null,
  path: [],
  carriages: [],
  schedule: [],
  error: null,
};

export const rideReducer = createReducer(
  initialState,
  on(
    RideActions.loadRidesSuccess,
    (state, { ride }): RideState => ({
      ...state,
      ...ride,
      error: null,
    }),
  ),
  on(
    RideActions.loadRidesFailure,
    (state, { error }): RideState => ({
      ...state,
      error,
    }),
  ),
);
