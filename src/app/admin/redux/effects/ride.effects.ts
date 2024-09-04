import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { RideService } from '../../services/ride.service';
import * as RideActions from '../actions/ride.actions';

@Injectable()
export class RideEffects {
  loadRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RideActions.loadRides),
      mergeMap(({ id }) =>
        this.rideService.getRides(id).pipe(
          map(data => RideActions.loadRidesSuccess({ ride: data })),
          catchError(error => of(RideActions.loadRidesFailure({ error }))),
        ),
      ),
    );
  });
  updateRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RideActions.updateRide),
      mergeMap(({ segments, rideId, routeId }) =>
        this.rideService.updateRides(routeId, rideId, segments).pipe(
          map(() => RideActions.loadRides({ id: routeId })),
          catchError(error => {
            console.log(error);
            return of(RideActions.loadRidesFailure({ error }));
          }),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private rideService: RideService,
  ) {}
}
