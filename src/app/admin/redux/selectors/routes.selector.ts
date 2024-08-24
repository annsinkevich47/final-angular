import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouteState } from '../reducers/routes.reducer';

export const selectRouteState = createFeatureSelector<RouteState>('route');

export const selectAllRoutes = createSelector(
  selectRouteState,
  (state: RouteState) => state.routes
);
