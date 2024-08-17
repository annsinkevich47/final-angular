import { Component, Input } from '@angular/core';

import CarriageType from '../../models/carriage';

@Component({
  selector: 'app-carriage-item',
  templateUrl: './carriage-item.component.html',
  styleUrl: './carriage-item.component.scss'
})
export class CarriageItemComponent {
  @Input() carriage!: CarriageType;
}
