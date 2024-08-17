import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import CarriageType from '../models/carriage';

@Injectable({
  providedIn: 'root'
})
export class CreateCarriageService {
  apiUrl = '/api/carriage';

  constructor(private http: HttpClient) {}

  public createCarriage(carriage: CarriageType): Observable<CarriageType> {

    return this.http.post<CarriageType>(this.apiUrl, carriage, {
      headers: {
        // eslint-disable-next-line max-len
        Authorization: `Bearer 4b90e1913c1672e92729902151179fde68145bfe6dc7f0d2f96cb787b50b6781b77c3e1f07bfb25ca3dd667889ef45b517b269499cf11edc35ec7ea4db494643`,
    }});
  }
}
