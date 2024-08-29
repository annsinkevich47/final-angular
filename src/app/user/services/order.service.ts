import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { IOrderItem } from '../../shared/models/orders-response.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersUrl = '/api/order';

  constructor(private http: HttpClient) {}

  public getOrders(isManager: boolean): Observable<IOrderItem[]> {
    return this.http
      .get<IOrderItem[]>(`${this.ordersUrl}?all=${isManager}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => {
      return error.error.message || 'Server error';
    });
  }
}
