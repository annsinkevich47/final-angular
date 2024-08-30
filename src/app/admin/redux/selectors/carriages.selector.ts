import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CarriageState } from '../reducers/carriages.reducer';

export const selectCarriageState =
  createFeatureSelector<CarriageState>('carriage');

export const selectAllCarriages = createSelector(
  selectCarriageState,
  (state: CarriageState) => state.carriages,
);
export const selectCarriageError = createSelector(
  selectCarriageState,
  (state: CarriageState) => state.error
);
