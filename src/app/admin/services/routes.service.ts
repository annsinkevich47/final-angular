import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteType } from '../types/routeType';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  readonly baseUrl = '/api/route';
  constructor(private http: HttpClient) {}

  getRoutes(): Observable<RouteType[]> {
    return this.http.get<RouteType[]>(this.baseUrl);
  }

  deleteRoute(id: number): Observable<object> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, {
      headers: {
        Authorization: `Bearer rgQeD8jYiSvV13yiBZ0om6ovHHl5ZtrwPLkUZI2QSh2a`,
      },
    });
  }
}
