import { createAction, props } from '@ngrx/store';

import { RideType, Segment } from '../../models/ride';

export const loadRides = createAction(
  '[Rides] Load Rides',
  props<{ id: number }>(),
);
export const loadRidesSuccess = createAction(
  '[Rides] Load Rides Success',
  props<{ ride: RideType }>(),
);
export const loadRidesFailure = createAction(
  '[Rides] Load Rides Failure',
  props<{ error: unknown }>(),
);
export const updateRide = createAction(
  '[Rides] Update Ride',
  props<{ segments: Segment[]; rideId: number; routeId: number }>(),
);
export const deleteRide = createAction(
  '[Rides] Delete Ride',
  props<{ rideId: number; routeId: number }>(),
);
