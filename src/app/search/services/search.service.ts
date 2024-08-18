import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { env } from '../../../environments/environment';
import { ICity, IRequestSearch, ITrip } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private arrayCities: ICity[] = [];
  public dateFilter$ = new Subject<string[]>();
  constructor(private http: HttpClient) {}

  getCities(address: string): Observable<ICity[]> {
    const params = new HttpParams().set('name', address).set('limit', 10);

    return this.http.get<ICity[]>(`${env.API_URL_CITIES}`, {
      headers: { 'X-Api-Key': env.API_KEY_CITIES },
      params,
    });
  }

  saveCities(arrayCities: ICity[]) {
    this.arrayCities = [...arrayCities];
  }

  setSchedule(requestSearch: IRequestSearch) {
    // this.getStations();
    const params = new HttpParams()
      .set('fromLatitude', requestSearch.fromLatitude)
      .set('fromLongitude', requestSearch.fromLongitude)
      .set('toLatitude', requestSearch.toLatitude)
      .set('toLongitude', requestSearch.toLongitude);

    // if (requestSearch.time) {
    //   params = new HttpParams()
    //     .set('fromLatitude', requestSearch.fromLatitude)
    //     .set('fromLongitude', requestSearch.fromLongitude)
    //     .set('toLatitude', requestSearch.toLatitude)
    //     .set('toLongitude', requestSearch.toLongitude)
    //     .set('time', requestSearch.time);
    // }
    console.log(params);
    this.http
      .get<ITrip>(`${env.API_URL_SEARCH}`, {
        // headers: {
        //   Authorization: `Bearer ${key}`,
        // },
        params,
      })
      .subscribe((data: ITrip) => {
        console.log(data);
        const arrayDateStart: string[] = [];
        const idStationFrom = data.from.stationId;
        data.routes.forEach(route => {
          let indexPath: number = -1;
          for (let index = 0; index < route.path.length; index += 1) {
            if (route.path[index] === idStationFrom) {
              indexPath = index;

              if (indexPath !== -1) {
                const copyIndex = indexPath;
                route.schedule.forEach(schedule => {
                  arrayDateStart.push(schedule.segments[copyIndex].time[0]);
                });
              }
              index = route.path.length;
            }
          }
        });

        this.dateFilter$.next(arrayDateStart);
      });
  }

  getStations() {
    this.http.get<ITrip>(`${env.API_URL_STATION}`).subscribe((data: ITrip) => {
      console.log(data);
    });
  }
}
