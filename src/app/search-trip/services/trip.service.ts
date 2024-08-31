import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, Subject } from 'rxjs';

import { env } from '../../../environments/environment';
import {
  ICardResult,
  IOrderView,
  ITripDetail,
  ITripResult,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  public card: ICardResult | null = null;
  public tripResult$ = new Subject<ITripResult>();

  public arrayOrders: IOrderView[] = [];
  public arrayOrders$ = new Subject<IOrderView[]>();

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
        this.createTripResult(data);
        // this.getInfoFromApi(data);
      });
  }

  public addSeatToList(
    numberSeat: number,
    seatCar: number,
    numberCar: number,
    indexCarriage: number,
  ): void {
    if (this.card?.stationFrom && this.card.stationTo) {
      const containerOrder = this.arrayOrders.filter(
        order => order.object.seat === numberSeat,
      );
      if (containerOrder.length > 0) {
        return;
      }

      this.arrayOrders.push({
        object: {
          seat: numberSeat,
          stationStart: this.card?.stationFrom.id,
          stationEnd: this.card?.stationTo.id,
          rideId: this.card?.schedules.rideId,
        },
        price: this.card?.prices[indexCarriage],
        seatCar,
        car: numberCar,
      });
      this.arrayOrders$.next(this.arrayOrders);
    }
  }

  public clearArrayOrder(): void {
    this.arrayOrders = [];
    this.arrayOrders$.next([]);
  }

  public deleteSeatToList(numberSeat: number): void {
    this.arrayOrders = this.arrayOrders.filter(
      order => order.object.seat !== numberSeat,
    );
    this.arrayOrders$.next(this.arrayOrders);
  }
}
