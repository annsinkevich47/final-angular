import { createAction, props } from '@ngrx/store';
import { RideState } from '../reducers/ride.reducer';

export const loadRides = createAction(
  '[Rides] Load Rides',
  props<{ id: number }>(),
);
export const loadRidesSuccess = createAction(
  '[Rides] Load Rides Success',
  props<{ ride: RideState[] }>(),
);
export const loadRidesFailure = createAction(
  '[Rides] Load Rides Failure',
  props<{ error: unknown }>(),
);
