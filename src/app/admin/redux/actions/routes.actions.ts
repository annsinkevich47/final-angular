import { createAction, props } from '@ngrx/store';
import { RouteType } from '../../../shared/models/routes-response.model';

export const loadRoutes = createAction('[Routes] Load Routes');
export const loadRoutesSuccess = createAction(
  '[Routes] Load Routes Success',
  props<{ routes: RouteType[] }>()
);
export const loadRoutesFailure = createAction(
  '[Routes] Load Routes Failure',
  props<{ error: unknown }>()
);

export const deleteRoute = createAction(
  '[Routes] Delete Route',
  props<{ id: number }>()
);
