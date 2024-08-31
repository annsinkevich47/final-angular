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

  ngOnInit(): void {
    this.occupiedSeats = [];

    this.createObjectAboutCar(this.car.infoAll);

    this.car.occupiedSeats.forEach(place => {
      console.log(place);
      
      const dataPlace = this.findCarriageAndSeat(place);
      console.log(dataPlace?.carriageIndex);
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

  public findCarriageAndSeat(index: number) {
    let currentIndex = 0;

    for (let i = 0; i < this.car.carriages.length; i += 1) {
      const carriage = this.car.carriages[i];
      const capacity = this.carriageCapacity[carriage];

      // Проверяем, попадает ли индекс в текущий вагон
      if (currentIndex + capacity > index) {
        // Находим номер места в вагоне
        const seatNumber = index - currentIndex + 1; // +1 для 1-ориентированного номера
        return { seatNumber, carriageIndex: i }; // Возвращаем индекс вагона
      }

      // Увеличиваем текущий индекс
      currentIndex += capacity;
    }

    return null; // Если индекс выходит за пределы
  }
}
