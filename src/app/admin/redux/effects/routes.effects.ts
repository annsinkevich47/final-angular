import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { RoutesService } from '../../services/route.service';
import * as RouteActions from '../actions/routes.actions';

@Injectable()
export class RouteEffects {
  loadRoutes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouteActions.loadRoutes),
      mergeMap(() =>
        this.routeService.getRoutes().pipe(
          map(data => RouteActions.loadRoutesSuccess({ routes: data })),
          catchError(error => of(RouteActions.loadRoutesFailure({ error })))
        )
      )
    );
  });
  deleteRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouteActions.deleteRoute),
      mergeMap(({ id }) => {
        console.log(id);
        return this.routeService.deleteRoute(id).pipe(
          map(() => RouteActions.loadRoutes()),
          catchError(error => of(RouteActions.loadRoutesFailure({ error })))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private routeService: RoutesService
  ) {}
}
