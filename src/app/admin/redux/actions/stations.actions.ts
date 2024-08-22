import { createAction, props } from '@ngrx/store';

import { Station } from '../../../shared/models/stations-response.model';

// Load carriages
export const loadStations = createAction('[Station] Load Stations');
export const loadStationsSuccess = createAction(
  '[Station] Load Stations Success',
  props<{ stations: Station[] }>()
);
export const loadStationsFailure = createAction(
  '[Station] Load Stations Failure',
  props<{ error: unknown }>()
);

// Create carriage
