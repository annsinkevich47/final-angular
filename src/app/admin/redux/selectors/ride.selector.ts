import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RideState } from '../reducers/ride.reducer';

export const selectRideState = createFeatureSelector<RideState>('ride');

export const selectAllRides = createSelector(
  selectRideState,
  (state: RideState) => state,
);
export const selectRideErrors = createSelector(
  selectRideState,
  (state: RideState) => state.error,
);
