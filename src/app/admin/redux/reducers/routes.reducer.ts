import { createReducer, on } from '@ngrx/store';

import { RouteType } from '../../../shared/models/routes-response.model';
import * as RouteActions from '../actions/routes.actions';

export interface RouteState {
  routes: RouteType[];
  error: unknown;
}

export const initialState: RouteState = {
  routes: [],
  error: null,
};

export const routeReducer = createReducer(
  initialState,
  on(
    RouteActions.loadRoutesSuccess,
    (state, { routes }): RouteState => ({
      ...state,
      routes,
    }),
  ),
  on(
    RouteActions.loadRoutesFailure,
    (state, { error }): RouteState => ({
      ...state,
      error,
    }),
  ),
);
