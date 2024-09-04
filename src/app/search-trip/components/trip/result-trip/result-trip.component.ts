import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  ICar,
  ICardResult,
  ICarriage,
  IOrderView,
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
  public isWaiting: boolean = false;

  public infoCars: ICar | null = null;
  public infoAllCarriages: ICarriage[] = [];

  public arrayOrders: IOrderView[] = [];
  public subscriptionTripDetail: Subscription | undefined;
  public subscriptionOrders: Subscription | undefined;
  public subscriptionWaiting: Subscription | undefined;
  public subscriptionCard: Subscription | undefined;

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
        this.idActiveCard = 0;
        this.tripResult = data;
        if (this.basicInfo?.carriages) {
          this.createInfoCar(
            this.tripResult?.uniqueCarriages[0],
            this.basicInfo?.carriages,
            this.basicInfo?.occupiedSeats,
          );
        }
      },
    );

    this.subscriptionOrders = this.tripServise.card$.subscribe(data => {
      this.basicInfo = data;

      if (this.infoCars) {
        this.infoCars = null;
      }
    });

    this.subscriptionOrders = this.tripServise.arrayOrders$.subscribe(data => {
      this.arrayOrders = [...data];
    });
    this.subscriptionWaiting = this.tripServise.isWaiting$.subscribe(data => {
      this.isWaiting = data;
    });
  }

  private createInfoCar(
    nameCarriage: string,
    carriages: string[],
    occupiedSeats: number[] = [],
  ): void {
    const numbersCar: number[] = [];
    carriages.forEach((carriage, index) => {
      if (carriage === nameCarriage) {
        numbersCar.push(index + 1);
      }
    });
    const [info] = this.infoAllCarriages.filter(
      carriage => carriage.code === nameCarriage,
    );
    this.infoCars = {
      name: nameCarriage,
      indexCarriage: this.idActiveCard,
      occupiedSeats,
      info,
      infoAll: this.infoAllCarriages,
      numbersCar,
      carriages,
    };
  }

  public ngOnDestroy(): void {
    this.subscriptionTripDetail?.unsubscribe();
    this.subscriptionOrders?.unsubscribe();
    this.subscriptionWaiting?.unsubscribe();
  }

  public bookSeats(): void {
    if (this.infoCars) {
      this.tripServise.bookSeats();
    }
  }

  public setActiveCard(id: number, carriage: string): void {
    this.idActiveCard = id;
    if (this.basicInfo?.carriages) {
      this.createInfoCar(
        carriage,
        this.basicInfo?.carriages,
        this.basicInfo?.occupiedSeats,
      );
    }
  }
}
