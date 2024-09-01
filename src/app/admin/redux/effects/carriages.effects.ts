import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { CreateCarriageService } from '../../services/create-carriage.service';
import { GetCarriagesService } from '../../services/get-carriages.service';
import { UpdateCarriagesService } from '../../services/update-carriages.service';
import * as CarriageActions from '../actions/carriages.actions';

@Injectable()
export class CarriageEffects {
  loadCarriages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarriageActions.loadCarriages),
      mergeMap(() =>
        this.getCarriagesService.getCarriages().pipe(
          map(data =>
            CarriageActions.loadCarriagesSuccess({ carriages: data.items }),
          ),
          catchError(error =>
            of(CarriageActions.loadCarriagesFailure({ error })),
          ),
        ),
      ),
    );
  });

  createCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarriageActions.createCarriage),
      mergeMap(action =>
        this.createCarriagesService.createCarriage(action.carriage).pipe(
          map(createdCarriage => {
            const mergedData = { ...action.carriage, ...createdCarriage };
            return CarriageActions.createCarriageSuccess({
              carriage: mergedData,
            });
          }),
          catchError(error => {
            const errorMessage = error.message || 'An error occurred';
            return of(
              CarriageActions.createCarriageFailure({ error: errorMessage }),
            );
          }),
        ),
      ),
    );
  });

  updateCarriage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarriageActions.updateCarriage),
      mergeMap(action =>
        this.updateCarriagesService.updateCarriage(action.carriage).pipe(
          map(updatedData => {
            const mergedData = { ...action.carriage, ...updatedData };
            return CarriageActions.updateCarriageSuccess({
              carriage: mergedData,
            });
          }),
          catchError(error =>
            of(CarriageActions.updateCarriageFailure({ error })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private getCarriagesService: GetCarriagesService,
    private createCarriagesService: CreateCarriageService,
    private updateCarriagesService: UpdateCarriagesService,
  ) {}
}
