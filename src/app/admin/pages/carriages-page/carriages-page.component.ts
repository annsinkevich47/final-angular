import { Component, OnInit } from '@angular/core';

import CarriageType from '../../models/carriage';
import { GetCarriagesService } from '../../services/get-carriages.service';

@Component({
  selector: 'app-carriages-page',
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss',
})
export class CarriagesPageComponent implements OnInit {
  public carriages: CarriageType[] = [];
  public formDisplay: boolean = false;
  public indexSeat: number = 1;
  public isCreating: boolean = false;
  public isUpdating: boolean = false;
  public selectedCarriage: CarriageType = {
    code: '',
    name: '',
    rows: 0,
    leftSeats: 0,
    rightSeats: 0,
  };

  constructor(private getCarriagesService: GetCarriagesService) {}

  ngOnInit(): void {
    this.getCarriagesArray();
  }

  public getCarriagesArray() {
    this.getCarriagesService.getCarriages().subscribe({
      next: data => {
        this.carriages = data.items;
      },
      error: err => {
        console.error('Error: carriages not received', err);
      },
    });
  }

  public onCreateCarriage() {
    if (this.formDisplay && !this.isUpdating) {
      this.formDisplay = false;
      return;
    }
    this.formDisplay = true;
    this.isCreating = true;
    this.isUpdating = false;
  }

  public onSelectCarriage(carriage: CarriageType) {
    this.formDisplay = true;
    this.isCreating = false;
    this.isUpdating = true;
    this.selectedCarriage.name = carriage.name;
    this.selectedCarriage.rows = carriage.rows;
    this.selectedCarriage.leftSeats = carriage.leftSeats;
    this.selectedCarriage.rightSeats = carriage.rightSeats;
    console.log(this.selectedCarriage);
  }
  public toggleFormDisplay() {
    this.formDisplay = !this.formDisplay;
  }
}
