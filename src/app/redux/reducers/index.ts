import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { carriageReducer } from '../../admin/redux/reducers/carriages.reducer';
import { stationReducer } from '../../admin/redux/reducers/stations.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  carriage: carriageReducer,
  station: stationReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
