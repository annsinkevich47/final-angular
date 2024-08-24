import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';

import { env } from '../../../environments/environment';
import { getDaydate, getTimeFromDateString } from '../consts/consts';
import {
  ArrayTypePrices,
  ICardResult,
  ICity,
  IRequestSearch,
  IRoute,
  ISchedule,
  IStationObj,
  ITrip,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public tripCardsData$ = new Subject<ICardResult[]>();
  public dateFilter$ = new Subject<string[]>();
  public actualDate$ = new Subject<string>();
  public stations: IStationObj[] = [];

  constructor(private http: HttpClient) {
    this.getStations();
  }

  getCities(address: string): Observable<ICity[]> {
    const params = new HttpParams().set('name', address).set('limit', 10);

    return this.http.get<ICity[]>(`${env.API_URL_CITIES}`, {
      headers: { 'X-Api-Key': env.API_KEY_CITIES },
      params,
    });
  }

  setSchedule(requestSearch: IRequestSearch) {
    const params = this.createParams(requestSearch);
    console.log(params);
    this.http
      .get<ITrip>(`${env.API_URL_SEARCH}`, {
        params,
      })
      .pipe(
        catchError(error => {
          console.error('Error executing the request:', error);
          return of(null);
        }),
      )
      .subscribe((data: ITrip | null) => {
        console.log(data);
        if (!data) {
          this.tripCardsData$.next([]);
          this.actualDate$.next('');
          return;
        }

        this.getInfoFromApi(data);
      });
  }

  getInfoFromApi(data: ITrip) {
    const arrayDateStart: string[] = [];
    let arrayResult: ICardResult[] = [];
    const idStationFrom = data.from.stationId;
    const idStationTo = data.to.stationId;
    data.routes.forEach(route => {
      let indexPathFrom: number = -1;
      let indexPathTo: number = -1;
      const indexStartStation = route.path[0];
      const indexEndStation = route.path[route.path.length - 1];
      for (let index = 0; index < route.path.length; index += 1) {
        switch (route.path[index]) {
          case idStationFrom:
            indexPathFrom = index;

            if (indexPathFrom !== -1) {
              const copyIndex = indexPathFrom;
              route.schedule.forEach(schedule => {
                arrayDateStart.push(schedule.segments[copyIndex].time[0]);
              });
            }
            break;
          case idStationTo:
            indexPathTo = index;
            break;
        }
        if (indexPathFrom !== -1 && indexPathTo !== -1) {
          console.log(indexPathFrom, indexPathTo);
          const copyIndexFrom = indexPathFrom;
          const copyIndexTo = indexPathTo;

          arrayResult = [
            ...arrayResult,
            ...this.createArrayTripCards(
              route,
              data,
              indexStartStation,
              indexEndStation,
              copyIndexFrom,
              copyIndexTo,
            ),
          ];
          index = route.path.length;
        }
      }
    });
    this.saveResults(arrayResult, arrayDateStart);
  }

  saveResults(arrayResult: ICardResult[], arrayDateStart: string[]) {
    this.tripCardsData$.next(arrayResult);
    const sortedDates = this.getUniqueDates(arrayDateStart);
    this.actualDate$.next(sortedDates[0]);
    this.dateFilter$.next(sortedDates);
  }

  createArrayTripCards(
    route: IRoute,
    data: ITrip,
    indexStartStation: number,
    indexEndStation: number,
    copyIndexFrom: number,
    copyIndexTo: number,
  ) {
    const arrayResult: ICardResult[] = [];

    route.schedule.forEach(schedule => {
      const timeStart = schedule.segments[copyIndexFrom].time[0];
      const timeEnd = schedule.segments[copyIndexTo - 1].time[1];
      const dateDataFrom = getDaydate(timeStart);
      const dateDataTo = getDaydate(timeEnd);
      let occupiedSeats: number[] = [];
      if (schedule.segments[copyIndexFrom].occupiedSeats.length === 0) {
        occupiedSeats = [-1, -1, -1, -1, -1, -1];
      } else {
        occupiedSeats = [...schedule.segments[copyIndexFrom].occupiedSeats];
      }
      arrayResult.push(
        this.createCardStation(
          data,
          dateDataFrom,
          dateDataTo,
          timeStart,
          timeEnd,
          indexStartStation,
          indexEndStation,
          occupiedSeats,
          this.getArrayPrices(schedule, copyIndexFrom, copyIndexTo),
        ),
      );
    });
    return arrayResult;
  }

  createParams(requestSearch: IRequestSearch) {
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
    return params;
  }

  getArrayPrices(schedule: ISchedule, indexFrom: number, indexTo: number) {
    const arrauPrices: number[] = [0, 0, 0, 0, 0, 0];

    for (let index = indexFrom; index < indexTo; index += 1) {
      ArrayTypePrices.forEach((type, indexArrayPrices) => {
        arrauPrices[indexArrayPrices] += schedule.segments[index].price[type]
          ? schedule.segments[index].price[type]
          : 0;
      });
    }

    return arrauPrices;
  }

  createCardStation(
    data: ITrip,
    dateDataFrom: { date: string; dayName: string },
    dateDataTo: { date: string; dayName: string },
    timeStart: string,
    timeEnd: string,
    indexStartStation: number,
    indexEndStation: number,
    occupiedSeats: number[],
    prices: number[],
  ) {
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
      stationStart: this.stations[indexStartStation].city,
      stationEnd: this.stations[indexEndStation].city,
      occupiedSeats,
      prices,
    };
    return cardStation;
  }

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
    this.http
      .get<IStationObj[]>(`${env.API_URL_STATION}`)
      .subscribe((data: IStationObj[]) => {
        console.log(data);
        this.stations = [...data];
      });
  }

  setActualDate(date: string) {
    this.actualDate$.next(date);
  }

  calculateTimeDifference(startDateStr: string, endDateStr: string): string {
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const minutesinHour = 60;
    const hoursInDay = 24;

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInSeconds = Math.floor(differenceInMilliseconds / millisecondsInSecond);

    const days = Math.floor(differenceInSeconds / (hoursInDay * secondsInMinute * minutesinHour));
    const hours = Math.floor((differenceInSeconds % (hoursInDay * secondsInMinute * minutesinHour)) / secondsInMinute * minutesinHour);
    const minutes = Math.floor((differenceInSeconds % (secondsInMinute * minutesinHour)) / secondsInMinute);

    return `${!days ? '' : `${days}d, `}${!hours ? '' : `${hours}h,`} ${minutes}m`;
  }
}
