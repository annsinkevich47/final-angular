import { Component, Input, OnInit } from '@angular/core';

import { ICar, ICarriage, ICarriageCapacity } from '../../../models/models';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent implements OnInit {
  @Input() car!: ICar;
  @Input() numberCar!: number;
  private carriageCapacity: ICarriageCapacity = {};
  private occupiedSeats: number[] = [];
  public arraySelected: boolean[] = [];

  ngOnInit(): void {
    this.occupiedSeats = [];

    this.createObjectAboutCar(this.car.infoAll);
    this.arraySelected = new Array(
      this.carriageCapacity[this.car.info.name],
    ).fill(false);

    this.car.occupiedSeats.forEach(place => {
      const dataPlace = this.findCarriageAndSeat(place);
      if (dataPlace?.carriageIndex === this.numberCar - 1) {
        this.occupiedSeats.push(dataPlace.seatNumber);
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

  public selected(index: number): void {
    this.arraySelected[index] = !this.arraySelected[index];
  }

  private findCarriageAndSeat(index: number) {
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
