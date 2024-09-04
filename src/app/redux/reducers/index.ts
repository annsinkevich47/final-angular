import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { carriageReducer } from '../../admin/redux/reducers/carriages.reducer';
import { rideReducer } from '../../admin/redux/reducers/ride.reducer';
import { routeFormReducer } from '../../admin/redux/reducers/routes-form.reducer';
import { routeReducer } from '../../admin/redux/reducers/routes.reducer';
import { stationReducer } from '../../admin/redux/reducers/stations.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  carriage: carriageReducer,
  station: stationReducer,
  route: routeReducer,
  routeForm: routeFormReducer,
  ride: rideReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
