import { createAction, props } from '@ngrx/store';

import { RouteType } from '../../../shared/models/routes-response.model';

export const setFormType = createAction(
  '[Routes Form] Set Form Type',
  props<{ formType: 'create' | 'update' | null }>()
);
export const setFormState = createAction(
  '[Routes] Set Form State',
  props<{ formState: RouteType }>()
);
