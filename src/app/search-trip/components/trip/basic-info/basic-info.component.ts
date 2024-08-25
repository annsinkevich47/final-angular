import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ICardResult, IScheduleTrip } from '../../../models/models';
import { PopupService } from '../../../services/popup.service';
import { TripService } from '../../../services/trip.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss',
})
export class BasicInfoComponent implements OnInit {
  public basicInfo: ICardResult | null = null;

  constructor(
    private tripServise: TripService,
    private location: LocationStrategy,
    private popupService: PopupService,
  ) {}

  public ngOnInit(): void {
    this.basicInfo = this.tripServise.card;
  }

  public backToMain(): void {
    this.location.back();
  }

  public openPopup(scheduleTrip: IScheduleTrip): void {
    this.popupService.open(scheduleTrip);
  }
}
