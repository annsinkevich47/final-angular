import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ICardResult } from '../../models/models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit, OnDestroy {
  public subscriptionTrip: Subscription | undefined;
  public subscriptionActualDate: Subscription | undefined;
  public actualDate: string = '';
  public tripData: ICardResult[] | null = null;
  public tripDataFiltered: ICardResult[] | null = null;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.subscriptionActualDate = this.searchService.actualDate$.subscribe(
      date => {
        this.actualDate = date;

        if (this.tripData) {
          const copyFilterData = [...this.tripData];
          this.filterData(copyFilterData);
        }
      },
    );
    this.subscriptionTrip = this.searchService.tripCardsData$.subscribe(
      list => {
        this.tripData = list;
      },
    );
  }

  filterData(list: ICardResult[]) {
    const now = new Date(this.actualDate);
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0,
    );
    this.tripDataFiltered = list
      ? list.filter(item => {
          const stationFromTime = new Date(item.stationFrom.time).getTime();
          return (
            startOfDay.getTime() <= stationFromTime &&
            stationFromTime <= endOfDay.getTime()
          );
        })
      : [];
  }

  ngOnDestroy(): void {
    this.subscriptionTrip?.unsubscribe();
    this.subscriptionActualDate?.unsubscribe();
  }

  // eslint-disable-next-line class-methods-use-this
  openPopup() {
    console.log('popup');
  }
}
