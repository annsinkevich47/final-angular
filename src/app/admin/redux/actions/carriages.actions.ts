import { createAction, props } from '@ngrx/store';

import CarriageType from '../../models/carriage';

// Load carriages
export const loadCarriages = createAction('[Carriage] Load Carriages');
export const loadCarriagesSuccess = createAction(
  '[Carriage] Load Carriages Success',
  props<{ carriages: CarriageType[] }>()
);
export const loadCarriagesFailure = createAction(
  '[Carriage] Load Carriages Failure',
  props<{ error: unknown }>()
);

// Create carriage
export const createCarriage = createAction(
  '[Carriage] Create Carriage',
  props<{ carriage: Omit<CarriageType, 'code'> }>()
);
export const createCarriageSuccess = createAction(
  '[Carriage] Create Carriage Success',
  props<{ carriage: CarriageType }>()
);

export const createCarriageFailure = createAction(
  '[Carriage] Create Carriage Failure',
  props<{ error: unknown }>()
);

// Update carriage
export const updateCarriage = createAction(
  '[Carriage] Update Carriage',
  props<{ carriage: CarriageType }>()
);
export const updateCarriageSuccess = createAction(
  '[Carriage] Update Carriage Success',
  props<{ carriage: CarriageType }>()
);
export const updateCarriageFailure = createAction(
  '[Carriage] Update Carriage Failure',
  props<{ error: unknown }>()
);
