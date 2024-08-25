import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ICardResult, IScheduleTrip } from '../../models/models';
import { PopupService } from '../../services/popup.service';
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

  constructor(
    private searchService: SearchService,
    private popupService: PopupService,
  ) {}

  public ngOnInit(): void {
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

  private filterData(list: ICardResult[]): void {
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

  public ngOnDestroy(): void {
    this.subscriptionTrip?.unsubscribe();
    this.subscriptionActualDate?.unsubscribe();
  }

  public openPopup(scheduleTrip: IScheduleTrip): void {
    this.popupService.open(scheduleTrip);
  }
}
