import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  ICar,
  ICarriage,
  ICarriageCapacity,
  IOrderView,
} from '../../../models/models';
import { TripService } from '../../../services/trip.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent implements OnInit {
  @Input() car!: ICar;
  @Input() numberCar!: number;
  @Input() arrayOrders!: IOrderView[];

  private carriageCapacity: ICarriageCapacity = {};
  public occupiedSeats: number[] = [];
  public arraySelected: boolean[] = [];

  public subscriptionOrders: Subscription | undefined;

  constructor(private tripServise: TripService) {}

  ngOnInit(): void {
    this.occupiedSeats = [];

    this.createObjectAboutCar(this.car.infoAll);
    this.arraySelected = new Array(
      this.carriageCapacity[this.car.info.name],
    ).fill(false);

    for (let index = 0; index < this.arrayOrders.length; index += 1) {
      if (this.numberCar === this.arrayOrders[index].car) {
        for (let j = 0; j < this.arraySelected.length; j += 1) {
          if (j === this.arrayOrders[index].seatCar - 1) {
            this.arraySelected[j] = true;
          }
        }
      }
    }

    this.car.occupiedSeats.forEach(place => {
      const dataPlace = this.findCarriageSeat(place);
      if (dataPlace?.carriageIndex === this.numberCar - 1) {
        this.occupiedSeats.push(dataPlace.seatNumber - 1);
      }
    });
  }

  private createObjectAboutCar(carriages: ICarriage[]) {
    carriages.forEach(carriage => {
      const capacity =
        carriage.rows * (carriage.leftSeats + carriage.rightSeats);
      this.carriageCapacity[carriage.code] = capacity;
    });
  }

  public isOccupiedSeat(number: number): boolean {
    return this.occupiedSeats.includes(number);
  }

  public isSelectedSeat(number: number, numberCar: number): boolean {
    const copyOrder = this.arrayOrders.filter(
      order => order.car === numberCar && order.seatCar === number,
    );
    return copyOrder.length > 0;
  }

  private getGlobalSeatNumber(carIndex: number, seatNumber: number): number {
    let globalSeatNumber = 0;

    for (let i = 0; i < carIndex; i += 1) {
      const seats = this.carriageCapacity[this.car.carriages[i]];
      globalSeatNumber += seats;
    }

    globalSeatNumber += seatNumber;

    return globalSeatNumber;
  }

  public selected(index: number, numberCar: number): void {
    const copyValueSelected = this.arraySelected[index];
    this.arraySelected = new Array(
      this.carriageCapacity[this.car.info.name],
    ).fill(false);
    this.arraySelected[index] = !copyValueSelected;
    if (this.arraySelected[index]) {
      this.tripServise.addSeatToList(
        this.getGlobalSeatNumber(numberCar, index),
        index + 1,
        numberCar + 1,
        this.car.indexCarriage,
      );
    } else {
      this.tripServise.deleteSeatToList(
        this.getGlobalSeatNumber(numberCar, index),
      );
    }
  }

  private findCarriageSeat(index: number) {
    let currentIndex = 0;

    for (let i = 0; i < this.car.carriages.length; i += 1) {
      const carriage = this.car.carriages[i];
      const capacity = this.carriageCapacity[carriage];

      if (currentIndex + capacity > index) {
        const seatNumber = index - currentIndex + 1;
        return { seatNumber, carriageIndex: i };
      }

      currentIndex += capacity;
    }

    return null;
  }
}
