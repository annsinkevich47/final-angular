import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  ICar,
  ICardResult,
  ICarriage,
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

  public infoCars: ICar | null = null;
  public infoAllCarriages: ICarriage[] = [];
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
        if (this.basicInfo?.carriages) {
          this.createInfoCar(
            this.tripResult?.uniqueCarriages[0],
            this.basicInfo?.carriages,
            // this.basicInfo?.occupiedSeats,
            [10, 12, 111],
          );
        }
      },
    );
  }

  private createInfoCar(
    nameCarriage: string,
    carriages: string[],
    occupiedSeats: number[] = [],
  ) {
    const numbersCar: number[] = [];
    carriages.forEach((carriage, index) => {
      if (carriage === nameCarriage) {
        numbersCar.push(index + 1);
      }
    });
    const [info] = this.infoAllCarriages.filter(
      carriage => carriage.name === nameCarriage,
    );
    this.infoCars = {
      name: nameCarriage,
      occupiedSeats,
      info,
      infoAll: this.infoAllCarriages,
      numbersCar,
      carriages,
    };
  }

  public ngOnDestroy(): void {
    this.subscriptionTripDetail?.unsubscribe();
  }

  public setActiveCard(id: number, carriage: string): void {
    this.idActiveCard = id;
    if (this.basicInfo?.carriages) {
      this.createInfoCar(
        carriage,
        this.basicInfo?.carriages,
        // this.basicInfo?.occupiedSeats,
        [10, 12, 111],
      );
    }
  }
}
