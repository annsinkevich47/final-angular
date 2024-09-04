import { createReducer, on } from '@ngrx/store';

import { RouteType } from '../../../shared/models/routes-response.model';
import * as RouteFormActions from '../actions/routes-form.actions';

export interface RouteFormState {
  formType: 'create' | 'update' | null;
  formState: RouteType | null;
}

export const initialState: RouteFormState = {
  formType: null,
  formState: null,
};

export const routeFormReducer = createReducer(
  initialState,
  on(
    RouteFormActions.setFormType,
    (state, { formType }): RouteFormState => ({
      ...state,
      formType,
    }),
  ),
  on(
    RouteFormActions.setFormState,
    (state, { formState }): RouteFormState => ({
      ...state,
      formState,
    }),
  ),
);
