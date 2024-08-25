import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ICardResult, ITripResult } from '../../../models/models';
import { TripService } from '../../../services/trip.service';

@Component({
  selector: 'app-result-trip',
  templateUrl: './result-trip.component.html',
  styleUrl: './result-trip.component.scss',
})
export class ResultTripComponent implements OnInit, OnDestroy {
  public basicInfo: ICardResult | null = null;
  public subscriptionTripDetail: Subscription | undefined;
  public tripResult: ITripResult | null = null;
  public idActiveCard: number = 0;

  constructor(private tripServise: TripService) {}

  public ngOnInit(): void {
    this.basicInfo = this.tripServise.card;
    console.log(this.basicInfo?.prices);
    if (this.basicInfo?.prices) {
      this.basicInfo.prices = this.basicInfo?.prices.filter(price => price > 0);
    }

    if (this.basicInfo?.schedules.rideId) {
      this.tripServise.getRideInformation(this.basicInfo?.schedules.rideId);
    }

    this.subscriptionTripDetail = this.tripServise.tripResult$.subscribe(
      data => {
        this.tripResult = data;
      },
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionTripDetail?.unsubscribe();
  }

  public setActiveCard(id: number): void {
    this.idActiveCard = id;
  }
}
