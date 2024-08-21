import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import CarriageType from '../models/carriage';

@Injectable({
  providedIn: 'root',
})
export class GetCarriagesService {
  apiUrl = '/api/carriage';

  constructor(private http: HttpClient) {}

  public getCarriages(): Observable<{ items: CarriageType[] }> {
    localStorage.setItem('authToken', 'token');
    return this.http
      .get<CarriageType[]>(this.apiUrl)
      .pipe(map((carriages: CarriageType[]) => ({ items: carriages })));
  }
}
