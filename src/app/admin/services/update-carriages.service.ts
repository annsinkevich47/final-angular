import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import CarriageType from '../models/carriage';

@Injectable({
  providedIn: 'root',
})
export class UpdateCarriagesService {
  private apiUrl = '/api/carriage';

  constructor(private http: HttpClient) {}

  updateCarriage(carriage: CarriageType): Observable<CarriageType> {
    const url = `${this.apiUrl}/${carriage.code}`;

    return this.http.put<CarriageType>(url, carriage);
  }
}
