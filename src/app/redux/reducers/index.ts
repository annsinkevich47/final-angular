import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { carriageReducer } from '../../admin/redux/reducers/carriages.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  carriage: carriageReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
