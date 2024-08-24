import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IScheduleTrip } from '../../models/models';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-popup-stations',
  templateUrl: './popup-stations.component.html',
  styleUrl: './popup-stations.component.scss',
})
export class PopupStationsComponent implements OnInit, OnDestroy {
  public isOpen = false;
  public scheduleTrip: IScheduleTrip[] = [];
  private subscriptionIsOpen: Subscription | undefined;
  private subscriptionScheduleTrip: Subscription | undefined;

  constructor(private popupService: PopupService) {}

  public ngOnInit(): void {
    this.subscriptionIsOpen = this.popupService.isOpen$.subscribe(value => {
      this.isOpen = value;
    });
    this.subscriptionScheduleTrip = this.popupService.scheduleTrip$.subscribe(
      array => {
        this.scheduleTrip = array;
      },
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionIsOpen?.unsubscribe();
    this.subscriptionScheduleTrip?.unsubscribe();
  }

  public closePopup(): void {
    this.popupService.close();
  }
}
