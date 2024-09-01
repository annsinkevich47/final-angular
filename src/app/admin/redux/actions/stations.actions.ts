import { createAction, props } from '@ngrx/store';

import { Station } from '../../../shared/models/stations-response.model';

// Load carriages
export const loadStations = createAction('[Station] Load Stations');
export const loadStationsSuccess = createAction(
  '[Station] Load Stations Success',
  props<{ stations: Station[] }>(),
);
export const loadStationsFailure = createAction(
  '[Station] Load Stations Failure',
  props<{ error: unknown }>(),
);

// Create carriage
export const addStation = createAction(
  '[Station] Add Station',
  props<{ station: Station }>(),
);

export const addStationSuccess = createAction(
  '[Station] Add Station Success',
  props<{ station: Station }>(),
);

export const addStationFailure = createAction(
  '[Station] Add Station Failure',
  props<{ error: unknown }>(),
);

// Delete station
export const deleteStation = createAction(
  '[Station] Delete Station',
  props<{ stationId: number }>(),
);

export const deleteStationSuccess = createAction(
  '[Station] Delete Station Success',
  props<{ stationId: number }>(),
);

export const deleteStationFailure = createAction(
  '[Station] Delete Station Failure',
  props<{ error: unknown }>(),
);
export const deleteStationInUse = createAction(
  '[Station] Delete Station In Use',
  props<{ stationId: number }>(),
);
