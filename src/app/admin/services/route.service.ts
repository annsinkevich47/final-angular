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

  getRoutes(): Observable<RouteType[]> {
    return this.http.get<RouteType[]>(this.baseUrl);
  }

  deleteRoute(id: number): Observable<object> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  createRoute(path: string[], carriages: string[]): Observable<object> {
    return this.http.post(this.baseUrl, {
      path,
      carriages,
    });
  }
}
