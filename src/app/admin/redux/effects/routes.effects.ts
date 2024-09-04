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
          catchError(error => of(RouteActions.loadRoutesFailure({ error }))),
        ),
      ),
    );
  });
  deleteRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouteActions.deleteRoute),
      mergeMap(({ id }) => {
        return this.routeService.deleteRoute(id).pipe(
          map(() => RouteActions.loadRoutes()),
          catchError(error => of(RouteActions.loadRoutesFailure({ error }))),
        );
      }),
    );
  });
  updateRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouteActions.updateRoute),
      mergeMap(({ path, carriages, id }) => {
        return this.routeService.updateRoute(path, carriages, id).pipe(
          map(() => RouteActions.loadRoutes()),
          catchError(error => of(RouteActions.loadRoutesFailure({ error }))),
          catchError(error => of(RouteActions.loadRoutesFailure({ error }))),
        );
      }),
      }),
    );
  });
  createRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RouteActions.createRoute),
      mergeMap(({ path, carriages }) => {
        return this.routeService.createRoute(path, carriages).pipe(
          map(() => RouteActions.loadRoutes()),
          catchError(error => of(RouteActions.loadRoutesFailure({ error }))),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private routeService: RoutesService,
  ) {}
}
