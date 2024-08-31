import { Component, Input } from '@angular/core';

import { ICarriage } from '../../../models/models';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss',
})
export class CarComponent {
  @Input() carriage!: ICarriage;

  public onUpdateCarriage(): void {
    // this.updateCarriage.emit(this.carriage);
  }
}
