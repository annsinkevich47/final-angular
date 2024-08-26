import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { DeleteStationsService } from '../../services/delete-stations.service';
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

  deleteStation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StationActions.deleteStation),
      mergeMap(action =>
        this.deleteStation.deleteStation(action.stationId).pipe(
          map(() =>
            StationActions.deleteStationSuccess({ stationId: action.stationId })
          ),
          catchError(error =>
            of(StationActions.deleteStationFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private stationService: StationService,

    private deleteStation: DeleteStationsService
  ) {}
}
