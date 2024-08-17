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

    return this.http.put<CarriageType>(url, carriage, {
      headers: {
        // eslint-disable-next-line max-len
        Authorization: `Bearer 4b90e1913c1672e92729902151179fde68145bfe6dc7f0d2f96cb787b50b6781b77c3e1f07bfb25ca3dd667889ef45b517b269499cf11edc35ec7ea4db494643`,
      },
    });
  }
}
