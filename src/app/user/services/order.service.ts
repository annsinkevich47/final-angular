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

  public getStationsNames() {
    return this.http.get<IStationItem[]>(this.stationsUrl);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => {
      return error.error.message || 'Server error';
    });
  }
}
