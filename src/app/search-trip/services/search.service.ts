import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';

import { env } from '../../../environments/environment';
import { getDaydate, getTimeFromDateString } from '../consts/consts';
import {
  ArrayTypePrices,
  ICardResult,
  ICarriage,
  ICity,
  IRequestSearch,
  IRoute,
  ISchedule,
  IScheduleStation,
  IScheduleTrip,
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
  public carriages: ICarriage[] = [];

  constructor(private http: HttpClient) {
    this.getStations();
    this.getCarriages();
  }

  public getCities(address: string): Observable<ICity[]> {
    const params = new HttpParams().set('name', address).set('limit', 10);

    return this.http.get<ICity[]>(`${env.API_URL_CITIES}`, {
      headers: { 'X-Api-Key': env.API_KEY_CITIES },
      params,
    });
  }

  public setSchedule(requestSearch: IRequestSearch): void {
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

  private getInfoFromApi(data: ITrip): void {
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
          default:
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

  private saveResults(
    arrayResult: ICardResult[],
    arrayDateStart: string[],
  ): void {
    this.tripCardsData$.next(arrayResult);
    const sortedDates = this.getUniqueDates(arrayDateStart);
    this.actualDate$.next(sortedDates[0]);
    this.dateFilter$.next(sortedDates);
  }

  private getTime(dateString: string): string {
    const dateObject: Date = new Date(dateString);

    const hours: number = dateObject.getHours();
    const minutes: number = dateObject.getMinutes();

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  private getDuration(dateStringStart: string, dateStringEnd: string): string {
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const date1: Date = new Date(dateStringStart);
    const date2: Date = new Date(dateStringEnd);

    const differenceInMilliseconds: number = date2.getTime() - date1.getTime();
    const differenceInMinutes: number = Math.floor(
      differenceInMilliseconds / (millisecondsInSecond * secondsInMinute),
    );

    const hours: number = Math.floor(differenceInMinutes / secondsInMinute);
    const minutes: number = differenceInMinutes % secondsInMinute;

    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  }

  private getArrayTimeSchedule(
    schedule: ISchedule,
    copyIndexFrom: number,
    copyIndexTo: number,
  ): { arrayTime: string[]; arrayDuration: string[] } {
    const arrayTime: string[] = [];
    const arrayDuration: string[] = [];
    for (
      let indexSegment = copyIndexFrom;
      indexSegment < copyIndexTo;
      indexSegment += 1
    ) {
      if (indexSegment + 1 === copyIndexTo) {
        arrayTime.push(
          // eslint-disable-next-line max-len
          `${this.getTime(schedule.segments[indexSegment - 1].time[1])} - ${this.getTime(schedule.segments[indexSegment].time[0])}`,
        );
        arrayTime.push(this.getTime(schedule.segments[indexSegment].time[1]));
        arrayDuration.push(
          this.getDuration(
            schedule.segments[indexSegment - 1].time[1],
            schedule.segments[indexSegment].time[0],
          ),
        );
        arrayDuration.push('last station');
      } else if (indexSegment !== copyIndexFrom) {
        arrayTime.push(
          // eslint-disable-next-line max-len
          `${this.getTime(schedule.segments[indexSegment - 1].time[1])} - ${this.getTime(schedule.segments[indexSegment].time[0])}`,
        );
        arrayDuration.push(
          this.getDuration(
            schedule.segments[indexSegment - 1].time[1],
            schedule.segments[indexSegment].time[0],
          ),
        );
      } else {
        arrayTime.push(this.getTime(schedule.segments[indexSegment].time[0]));
        arrayDuration.push('first station');
      }
    }
    return { arrayTime, arrayDuration };
  }

  private createSchedules(
    route: IRoute,
    schedule: ISchedule,
    copyIndexFrom: number,
    copyIndexTo: number,
    routeId: number,
  ): IScheduleTrip {
    const arrayIndexesStation: number[] = [];
    const arrayStations: string[] = [];
    let arrayTime: string[] = [];
    let arrayDuration: string[] = [];
    let scheduleTrips: IScheduleTrip | null = null;
    const scheduleStation: IScheduleStation[] = [];
    for (let index = copyIndexFrom; index <= copyIndexTo; index += 1) {
      arrayIndexesStation.push(route.path[index]);
    }

    let index = 0;
    for (
      let indexStation = 0;
      indexStation < this.stations.length;
      indexStation += 1
    ) {
      if (this.stations[indexStation].id === arrayIndexesStation[index]) {
        arrayStations.push(this.stations[indexStation].city);
        indexStation = -1;
        index += 1;
      }
    }

    const dataArrayTime = this.getArrayTimeSchedule(
      schedule,
      copyIndexFrom,
      copyIndexTo,
    );
    arrayTime = [...dataArrayTime.arrayTime];
    arrayDuration = [...dataArrayTime.arrayDuration];

    arrayTime.forEach((time, indexTime) => {
      scheduleStation.push({
        time,
        nameStation: arrayStations[indexTime],
        duration: arrayDuration[indexTime],
      });
    });

    scheduleTrips = {
      rideId: schedule.rideId ? schedule.rideId : -1,
      scheduleStation,
      routeId,
    };
    return scheduleTrips;
  }

  private createArrayTripCards(
    route: IRoute,
    data: ITrip,
    indexStartStation: number,
    indexEndStation: number,
    copyIndexFrom: number,
    copyIndexTo: number,
  ): ICardResult[] {
    const arrayResult: ICardResult[] = [];

    route.schedule.forEach(schedule => {
      const timeStart = schedule.segments[copyIndexFrom].time[0];
      const timeEnd = schedule.segments[copyIndexTo - 1].time[1];
      const dateDataFrom = getDaydate(timeStart);
      const dateDataTo = getDaydate(timeEnd);
      let occupiedSeats: number[] = [];
      console.log(schedule.segments[copyIndexFrom].occupiedSeats);
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
          this.createSchedules(
            route,
            schedule,
            copyIndexFrom,
            copyIndexTo,
            route.id,
          ),
          route.carriages,
        ),
      );
    });
    return arrayResult;
  }

  private createParams(requestSearch: IRequestSearch): HttpParams {
    let params = new HttpParams()
      .set('fromLatitude', requestSearch.fromLatitude)
      .set('fromLongitude', requestSearch.fromLongitude)
      .set('toLatitude', requestSearch.toLatitude)
      .set('toLongitude', requestSearch.toLongitude);

    console.log(requestSearch.time);

    if (requestSearch.time) {
      params = new HttpParams()
        .set('fromLatitude', requestSearch.fromLatitude)
        .set('fromLongitude', requestSearch.fromLongitude)
        .set('toLatitude', requestSearch.toLatitude)
        .set('toLongitude', requestSearch.toLongitude)
        .set('time', requestSearch.time);
    }
    return params;
  }

  private getArrayPrices(
    schedule: ISchedule,
    indexFrom: number,
    indexTo: number,
  ): number[] {
    const arrayPrices: number[] = [0, 0, 0, 0, 0, 0];

    for (let index = indexFrom; index < indexTo; index += 1) {
      ArrayTypePrices.forEach((type, indexArrayPrices) => {
        arrayPrices[indexArrayPrices] += schedule.segments[index].price[type]
          ? schedule.segments[index].price[type]
          : 0;
      });
    }

    return arrayPrices;
  }

  private createCardStation(
    data: ITrip,
    dateDataFrom: { date: string; dayName: string },
    dateDataTo: { date: string; dayName: string },
    timeStart: string,
    timeEnd: string,
    indexStartStation: number,
    indexEndStation: number,
    occupiedSeats: number[],
    prices: number[],
    schedules: IScheduleTrip,
    carriages: string[],
  ): ICardResult {
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
      schedules,
      carriages,
    };
    return cardStation;
  }

  private getUniqueDates(dates: string[]): string[] {
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

  private getStations(): void {
    this.http
      .get<IStationObj[]>(`${env.API_URL_STATION}`)
      .subscribe((data: IStationObj[]) => {
        console.log(data);
        this.stations = [...data];
      });
  }

  private getCarriages(): void {
    this.http
      .get<ICarriage[]>(`${env.API_URL_CARRIAGE}`)
      .subscribe((data: ICarriage[]) => {
        console.log(data);
        this.carriages = [...data];
      });
  }

  public setActualDate(date: string): void {
    this.actualDate$.next(date);
  }

  private calculateTimeDifference(
    startDateStr: string,
    endDateStr: string,
  ): string {
    const millisecondsInSecond = 1000;
    const secondsInMinute = 60;
    const minutesInHour = 60;
    const hoursInDay = 24;

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInSeconds = Math.floor(
      differenceInMilliseconds / millisecondsInSecond,
    );

    const days = Math.floor(
      differenceInSeconds / (hoursInDay * secondsInMinute * minutesInHour),
    );
    const hours = Math.floor(
      (differenceInSeconds % (hoursInDay * secondsInMinute * minutesInHour)) /
        (secondsInMinute * minutesInHour),
    );

    const minutes = Math.floor(
      (differenceInSeconds % (secondsInMinute * minutesInHour)) /
        secondsInMinute,
    );

    return `${!days ? '' : `${days}d, `}${!hours ? '' : `${hours}h,`} ${minutes}m`;
  }
}
