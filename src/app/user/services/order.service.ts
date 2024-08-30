import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import {
  IOrderItem,
  ITransformedOrderItem,
} from '../../shared/models/orders-response.model';

export interface IStationItem {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: IConnectedStation[];
}

interface IConnectedStation {
  id: number;
  distance: number;
}

interface ICarriage {
  code: string;
  name: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}

interface ITransformedCarriage {
  code: string;
  name: string;
  places: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = '/api/order';
  private stationsUrl = '/api/station';
  private carriageUrl = '/api/carriage';

  constructor(private http: HttpClient) {}

  public getOrders(isManager: boolean): Observable<IOrderItem[]> {
    return this.http
      .get<IOrderItem[]>(`${this.ordersUrl}?all=${isManager}`)
      .pipe(catchError(this.handleError));
  }

  public getStations() {
    return this.http.get<IStationItem[]>(this.stationsUrl);
  }

  public getTransformedCarriages(): Observable<ITransformedCarriage[]> {
    return this.http.get<ICarriage[]>(this.carriageUrl).pipe(
      map(carriages =>
        carriages.map(carriage => ({
          code: carriage.code,
          name: carriage.name,
          places: (carriage.leftSeats + carriage.rightSeats) * carriage.rows,
        })),
      ),
    );
  }

  public calculateTripDuration(startTrip: string, endTrip: string): string {
    const MILLISECONDS_IN_SECOND = 1000;
    const SECONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;

    const startTime = new Date(startTrip).getTime();
    const endTime = new Date(endTrip).getTime();
    const durationInMillis = endTime - startTime;
    const totalMinutes = Math.floor(
      durationInMillis / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE),
    );
    const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
    const minutes = totalMinutes % SECONDS_IN_MINUTE;

    return `${hours}h ${minutes}m`;
  }

  public getStationNameById(
    stations: IStationItem[],
    stationId: number,
  ): string {
    const station = stations.find(item => item.id === stationId);
    return station ? station.city : 'Unknown Station';
  }

  public sortProcessedOrders(
    orders: ITransformedOrderItem[],
  ): ITransformedOrderItem[] {
    return orders.sort((a, b) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
  }

  public findCarriageAndSeat(
    order: IOrderItem,
    carriages: ITransformedCarriage[],
  ): {
    carriageCode: string;
    carriageName: string;
    seatNumber: number;
    carriageIndex: number;
  } | null {
    let currentIndex = 0;
    const carriageSequence = order.carriages;
    const carriagesWithCapacity = carriages;

    for (let i = 0; i < carriageSequence.length; i += 1) {
      const carriageCode = carriageSequence[i];
      const currentCarriage = carriagesWithCapacity.find(
        c => c.code === carriageCode,
      );

      if (currentCarriage) {
        const { places } = currentCarriage;

        if (currentIndex + places > order.seatId) {
          const seatNumber = order.seatId - currentIndex; // (from 0) or (from 1)??
          return {
            carriageCode,
            carriageName: currentCarriage.name,
            seatNumber,
            carriageIndex: i + 1,
          };
        }

        currentIndex += places;
      }
    }

    return null;
  }

  public calculatePrice(
    order: IOrderItem,
    startStationIdx: number,
    endStationIdx: number,
    carriageCode: string,
  ): number {
    let sum = 0;

    for (let i = startStationIdx; i < endStationIdx; i += 1) {
      sum += order.schedule.segments[i].price[`${carriageCode}`];
    }

    return sum;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => {
      return error.error.message || 'Server error';
    });
  }

  // create a new order
  // public createOrder() {
  //   const body = {
  //     rideId: 1236,
  //     seat: 213,
  //     stationStart: 4,
  //     stationEnd: 62,
  //   };
  //   return this.http.post('/api/order', JSON.stringify(body));
  // }
}
