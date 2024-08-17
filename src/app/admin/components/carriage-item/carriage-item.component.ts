import { Component, EventEmitter,Input, Output } from '@angular/core';

import CarriageType from '../../models/carriage';

@Component({
  selector: 'app-carriage-item',
  templateUrl: './carriage-item.component.html',
  styleUrls: ['./carriage-item.component.scss']
})
export class CarriageItemComponent {
  @Input() carriage!: CarriageType;
  @Output() updateCarriage = new EventEmitter<CarriageType>();

  onUpdateCarriage() {
    this.updateCarriage.emit(this.carriage);
  }
}
