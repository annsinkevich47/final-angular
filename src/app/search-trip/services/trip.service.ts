import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Subject } from 'rxjs';

import { env } from '../../../environments/environment';
import { ICardResult, ITripDetail, ITripResult } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  public card: ICardResult | null = null;
  public tripResult$ = new Subject<ITripResult>();

  constructor(private http: HttpClient) {}

  public save(card: ICardResult): void {
    this.card = card;
  }

  private createTripResult(tripDetail: ITripDetail) {
    const tripResult: ITripResult = {
      uniqueCarriages: [...new Set(tripDetail.carriages.sort())],
    };

    this.tripResult$.next(tripResult);
  }

  public getRideInformation(rideId: number): void {
    this.http
      .get<ITripDetail>(`${env.API_URL_SEARCH}/${rideId}`)
      .pipe(
        catchError(error => {
          console.error('Error executing the request:', error);
          return of(null);
        }),
      )
      .subscribe((data: ITripDetail | null) => {
        if (!data) {
          // this.tripCardsData$.next([]);
          // this.actualDate$.next('');
          return;
        }
        console.log(data);
        this.createTripResult(data);
        // this.getInfoFromApi(data);
      });
  }
}
