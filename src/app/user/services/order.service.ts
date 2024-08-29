import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { IOrderItem } from '../../shared/models/orders-response.model';

interface IConnectedStation {
  id: number;
  distance: number;
}

export interface IStationItem {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: IConnectedStation[];
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = '/api/order';
  private stationsUrl = '/api/station';

  constructor(private http: HttpClient) {}

  public getOrders(isManager: boolean): Observable<IOrderItem[]> {
    return this.http
      .get<IOrderItem[]>(`${this.ordersUrl}?all=${isManager}`)
      .pipe(catchError(this.handleError));
  }

  public getStations() {
    return this.http.get<IStationItem[]>(this.stationsUrl);
  }

  public calculateTripDuration(startTrip: string, endTrip: string): string {
    const startTime = new Date(startTrip).getTime();
    const endTime = new Date(endTrip).getTime();
    const durationInMillis = endTime - startTime;
    const totalMinutes = Math.floor(durationInMillis / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  }

  public getStationNameById(
    stations: IStationItem[],
    stationId: number,
  ): string {
    const station = stations.find(item => item.id === stationId);
    return station ? station.city : 'Unknown Station';
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => {
      return error.error.message || 'Server error';
    });
  }
}
