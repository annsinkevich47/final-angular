import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { env } from '../../../environments/environment';
import { getDaydate, getTimeFromDateString } from '../consts/consts';
import { ICardResult, ICity, IRequestSearch, ITrip } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // private arrayCities: ICity[] = [];
  public tripCardsData$ = new Subject<ICardResult[]>();
  public dateFilter$ = new Subject<string[]>();
  public actualDate$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  getCities(address: string): Observable<ICity[]> {
    const params = new HttpParams().set('name', address).set('limit', 10);

    return this.http.get<ICity[]>(`${env.API_URL_CITIES}`, {
      headers: { 'X-Api-Key': env.API_KEY_CITIES },
      params,
    });
  }

  // saveCities(arrayCities: ICity[]) {
  //   this.arrayCities = [...arrayCities];
  // }

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
        const arrayResult: ICardResult[] = [];
        const idStationFrom = data.from.stationId;
        const idStationTo = data.to.stationId;
        data.routes.forEach(route => {
          let indexPathFrom: number = -1;
          let indexPathTo: number = -1;
          for (let index = 0; index < route.path.length; index += 1) {
            if (route.path[index] === idStationFrom) {
              indexPathFrom = index;

              if (indexPathFrom !== -1) {
                const copyIndex = indexPathFrom;
                route.schedule.forEach(schedule => {
                  arrayDateStart.push(schedule.segments[copyIndex].time[0]);
                });
              }
            }
            if (route.path[index] === idStationTo) {
              indexPathTo = index;
            }
            if (indexPathFrom !== -1 && indexPathTo !== -1) {
              console.log(indexPathFrom, indexPathTo);
              const copyIndexFrom = indexPathFrom;
              const copyIndexTo = indexPathTo;

              route.schedule.forEach(schedule => {
                const timeStart = schedule.segments[copyIndexFrom].time[0];
                const timeEnd = schedule.segments[copyIndexTo - 1].time[1];
                const dateDataFrom = getDaydate(timeStart);
                const dateDataTo = getDaydate(timeEnd);
                const cardStation: ICardResult = {
                  stationFrom: {
                    id: data.from.stationId,
                    name: data.from.city,
                    date: dateDataFrom.date,
                    day: dateDataFrom.dayName,
                    time: timeStart,
                    timeDay: getTimeFromDateString(timeStart),
                  },
                  stationTo: {
                    id: data.to.stationId,
                    name: data.to.city,
                    date: dateDataTo.date,
                    day: dateDataTo.dayName,
                    time: timeEnd,
                    timeDay: getTimeFromDateString(timeEnd),
                  },
                  timePath: this.calculateTimeDifference(timeStart, timeEnd),
                };
                arrayResult.push(cardStation);
              });
              index = route.path.length;
            }
          }
        });
        this.tripCardsData$.next(arrayResult);
        const sortedDates = this.getUniqueDates(arrayDateStart);
        this.actualDate$.next(sortedDates[0]);
        this.dateFilter$.next(sortedDates);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  getUniqueDates(dates: string[]) {
    const uniqueDays = new Set();

    return dates
      .filter(date => {
        const day = date.split('T')[0];
        if (!uniqueDays.has(day)) {
          uniqueDays.add(day);
          return true;
        }
        return false;
      })
      .sort();
  }

  getStations() {
    this.http.get<ITrip>(`${env.API_URL_STATION}`).subscribe((data: ITrip) => {
      console.log(data);
    });
  }

  setActualDate(date: string) {
    this.actualDate$.next(date);
  }

  // eslint-disable-next-line class-methods-use-this
  calculateTimeDifference(startDateStr: string, endDateStr: string): string {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

    const days = Math.floor(differenceInSeconds / (24 * 3600));
    const hours = Math.floor((differenceInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);

    return `${!days ? '' : `${days}d, `}${!hours ? '' : `${hours}h,`} ${minutes}m`;
  }
}
