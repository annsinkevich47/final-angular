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
import { PopupBookService } from './popup-book.service';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  public card: ICardResult | null = null;
  public tripResult$ = new Subject<ITripResult>();

  public isWaiting$ = new Subject<boolean>();
  public arrayOrders: IOrderView[] = [];
  public arrayOrders$ = new Subject<IOrderView[]>();
  public card$ = new Subject<ICardResult>();

  constructor(
    private http: HttpClient,
    private popupBook: PopupBookService,
  ) {}

  public save(card: ICardResult): void {
    this.card = card;
    this.card$.next(card);
  }

  private createTripResult(tripDetail: ITripDetail): void {
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
          return;
        }
        this.createTripResult(data);
      });
  }

  public bookSeats(): void {
    this.isWaiting$.next(true);
    this.arrayOrders.forEach(order => {
      setTimeout(() => {
        const copyOrder = order.object;
        copyOrder.seat += 1;
        const body = copyOrder;
        console.log(body);

        this.http
          .post(`${env.API_URL_ORDER}`, body)
          .pipe(
            catchError(error => {
              console.error('Error executing the request:', error);
              let msgError = error.error.message;
              if (error.status === 401) {
                msgError += `. Please, login!`;
              }
              this.popupBook.open({
                isGood: false,
                msg: msgError,
              });
              return of(null);
            }),
          )
          .subscribe((data: unknown) => {
            this.isWaiting$.next(false);
            if (!data) {
              return;
            }
            this.card?.occupiedSeats.push(order.object.seat);
            const copyCard = this.card;
            if (copyCard) {
              this.card$.next(copyCard);
            }
            this.popupBook.open({
              isGood: true,
              msg: 'The seat is booked',
            });
            this.getRideInformation(order.object.rideId);
            this.clearArrayOrder();
          });
      }, 500);
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
      this.arrayOrders = [];
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
