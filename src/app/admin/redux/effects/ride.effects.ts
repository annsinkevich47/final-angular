import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { RideService } from '../../services/ride.service';
import * as RideActions from '../actions/ride.actions';

@Injectable()
export class RideEffects {
  loadRides$ = createEffect(() => {
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

  constructor(
    private actions$: Actions,
    private rideService: RideService,
  ) {}
}
