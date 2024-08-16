import { Component, OnInit } from '@angular/core';
import { GetCarriagesService } from '../../services/get-carriages.service';
import CarriageType from '../../models/carriage';

@Component({
  selector: 'app-carriages-page',
  templateUrl: './carriages-page.component.html',
  styleUrl: './carriages-page.component.scss'
})
export class CarriagesPageComponent implements OnInit {
  public carriages: CarriageType[] = [];
  public formDisplay: boolean = true;
  public indexSeat: number = 1;

  constructor(private getCarriagesService: GetCarriagesService) {}

  ngOnInit(): void {
    this.getCarriagesArray();
  }

  public getCarriagesArray() {
    this.getCarriagesService.getCarriages().subscribe({
      next: (data) => {
        this.carriages = data.items;
      },
      error: (err) => {
        console.error('Error: carriages not received', err);
      }
    })
  }

  public toggleFormDisplay() {
    this.formDisplay = !this.formDisplay;
  }
}
