import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  ICardResult,
  ICarriage,
  ICarriageView,
  ITripResult,
} from '../../../models/models';
import { SearchService } from '../../../services/search.service';
import { TripService } from '../../../services/trip.service';

@Component({
  selector: 'app-result-trip',
  templateUrl: './result-trip.component.html',
  styleUrl: './result-trip.component.scss',
})
export class ResultTripComponent implements OnInit, OnDestroy {
  public basicInfo: ICardResult | null = null;
  public tripResult: ITripResult | null = null;
  public idActiveCard: number = 0;

  public activeCarriages: ICarriageView[] = [];
  public infoAllCarriages: ICarriage[] = [];
  public filterInfoCarriages: ICarriage[] = [];
  public subscriptionTripDetail: Subscription | undefined;

  constructor(
    private tripServise: TripService,
    private searchService: SearchService,
  ) {}

  public ngOnInit(): void {
    this.basicInfo = this.tripServise.card;

    if (this.basicInfo?.prices) {
      this.basicInfo.prices = this.basicInfo?.prices.filter(price => price > 0);
    }

    if (this.basicInfo?.schedules.rideId) {
      this.tripServise.getRideInformation(this.basicInfo?.schedules.rideId);
    }

    this.infoAllCarriages = [...this.searchService.carriages];
    this.subscriptionTripDetail = this.tripServise.tripResult$.subscribe(
      data => {
        this.tripResult = data;
        this.filterInfoCarriages = this.infoAllCarriages.filter(
          info => info.name === this.tripResult?.uniqueCarriages[0],
        );
      },
    );
  }

  public ngOnDestroy(): void {
    this.subscriptionTripDetail?.unsubscribe();
  }

  public setActiveCard(id: number, carriage: string): void {
    this.idActiveCard = id;
    this.filterInfoCarriages = this.infoAllCarriages.filter(
      info => info.name === carriage,
    );
    console.log(this.filterInfoCarriages);
  }
}
