import { createReducer, on } from '@ngrx/store';

import CarriageType from '../../models/carriage';
import * as CarriageActions from '../actions/carriages.actions';

export interface CarriageState {
  carriages: CarriageType[];
  error: unknown;
}

export const initialState: CarriageState = {
  carriages: [],
  error: null,
};

export const carriageReducer = createReducer(
  initialState,
  on(
    CarriageActions.loadCarriagesSuccess,
    (state, { carriages }): CarriageState => ({
      ...state,
      carriages,
    }),
  ),
  on(
    CarriageActions.loadCarriagesFailure,
    (state, { error }): CarriageState => ({
      ...state,
      error,
    }),
  ),
  on(
    CarriageActions.createCarriageSuccess,
    (state, { carriage }): CarriageState => ({
      ...state,
      carriages: [carriage, ...state.carriages],
    }),
  ),
  on(
    CarriageActions.createCarriageFailure,
    (state, { error }): CarriageState => ({
      ...state,
      error,
    }),
  ),
  on(CarriageActions.updateCarriageSuccess, (state, { carriage }) => ({
    ...state,
    carriages: state.carriages.map(c =>
      c.code === carriage.code ? { ...c, ...carriage } : c,
    ),
  })),
);
