import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouteFormState } from '../reducers/routes-form.reducer';

export const selectRouteFormStore =
  createFeatureSelector<RouteFormState>('routeForm');

export const selectRouteFromState = createSelector(
  selectRouteFormStore,
  state => state.formState
);

export const selectRouteFormType = createSelector(
  selectRouteFormStore,
  state => state.formType
);
