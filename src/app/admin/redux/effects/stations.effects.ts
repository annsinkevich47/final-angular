import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { AddStationService } from '../../services/add-station.service';
import { StationService } from '../../services/station.service';
import * as StationActions from '../actions/stations.actions';

@Injectable()
export class StationEffects {
  loadStations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StationActions.loadStations),
      mergeMap(() =>
        this.stationService.getStations().pipe(
          map(data => StationActions.loadStationsSuccess({ stations: data })),
          catchError(error => of(StationActions.loadStationsFailure({ error })))
        )
      )
    );
  });

  // addStation$ = createEffect(() =>
  //   { return this.actions$.pipe(
  //     ofType(StationActions.addStation),
  //     mergeMap(action =>
  //       this.addStation.addStation(action.station).pipe(
  //         map(station => StationActions.addStationSuccess({ station })),
  //         catchError(error => of(StationActions.addStationFailure({ error })))
  //       )
  //     )
  //   ) }
  // );

  constructor(
    private actions$: Actions,
    private stationService: StationService,
    private addStation: AddStationService
  ) {}
}
