import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiKey = '113TwW5tXJm+KerYAFmzqw==D9tBleuXxzjTqaxN';
  private baseUrl = 'https://api.api-ninjas.com/v1/city';

  constructor(private http: HttpClient) {}

  getGeocode(address: string): Observable<any> {
    const params = new HttpParams().set('name', address).set('limit', 10);

    return this.http.get(`${this.baseUrl}`, {
      headers: { 'X-Api-Key': this.apiKey },
      params,
    });
  }
}
