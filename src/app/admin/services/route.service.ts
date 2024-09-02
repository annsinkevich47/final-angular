import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RouteType } from '../../shared/models/routes-response.model';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  readonly baseUrl = '/api/route';
  constructor(private http: HttpClient) {}

  public getRoutes(): Observable<RouteType[]> {
    return this.http.get<RouteType[]>(this.baseUrl);
  }

  public deleteRoute(id: number): Observable<object> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  public createRoute(path: string[], carriages: string[]): Observable<object> {
    return this.http.post(this.baseUrl, {
      path,
      carriages,
    });
  }
  public updateRoute(
    path: string[],
    carriages: string[],
    id: number | undefined,
  ): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}`, {
      path,
      carriages,
    });
  }
}
