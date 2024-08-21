import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import CarriageType from '../models/carriage';

@Injectable({
  providedIn: 'root',
})
export class CreateCarriageService {
  apiUrl = '/api/carriage';

  constructor(private http: HttpClient) {}

  public createCarriage(carriage: CarriageType): Observable<CarriageType> {
    return this.http.post<CarriageType>(this.apiUrl, carriage);
  }
}
