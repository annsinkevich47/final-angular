import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import CarriageType from '../../models/carriage';
import { CreateCarriageService } from '../../services/create-carriage.service';
import { GetCarriagesService } from '../../services/get-carriages.service';
import { UpdateCarriagesService } from '../../services/update-carriages.service';

@Component({
  selector: 'app-carriages-page',
  templateUrl: './carriages-page.component.html',
  styleUrls: ['./carriages-page.component.scss'],
})
export class CarriagesPageComponent implements OnInit {
  public carriages: CarriageType[] = [];
  public prototypeForm!: FormGroup;
  public formDisplay: boolean = false;
  public indexSeat: number = 1;
  public createPrototype: boolean = false;
  public isCreating: boolean = false;
  public isUpdating: boolean = false;
  public selectedCarriage: CarriageType = {
    code: '',
    name: '',
    rows: 0,
    leftSeats: 0,
    rightSeats: 0,
  };

  constructor(
    private getCarriagesService: GetCarriagesService,
    private createCarriagesService: CreateCarriageService,
    private updateCarriagesService: UpdateCarriagesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCarriagesArray();
    this.prototypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      rows: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.max(15),
        ],
      ],
      leftSeats: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.max(10),
        ],
      ],
      rightSeats: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.max(10),
        ],
      ],
    });
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

  public onSave() {
    if (this.prototypeForm.valid) {
      const { name, rows, leftSeats, rightSeats } = this.prototypeForm.value;
      const newCarriage: CarriageType = {
        name,
        rows: Number(rows),
        leftSeats: Number(leftSeats),
        rightSeats: Number(rightSeats),
      };
      this.carriages.unshift(newCarriage);
      console.log(newCarriage);
      this.createCarriagesService.createCarriage(newCarriage).subscribe({
        next: response => {
          console.log('Carriage created:', response);
          this.createPrototype = true;
          this.resetForm();
        },
        error: err => {
          console.error('Error: carriage not created', err);
        },
      });
    }
  }

  public onUpdate() {
    if (this.prototypeForm.valid && this.isUpdating) {
      const updatedCarriage: CarriageType = {
        ...this.selectedCarriage,
        name: this.prototypeForm.value.name,
        rows: Number(this.prototypeForm.value.rows),
        leftSeats: Number(this.prototypeForm.value.leftSeats),
        rightSeats: Number(this.prototypeForm.value.rightSeats),
      };

      const index = this.carriages.findIndex(
        carriage => carriage.code === updatedCarriage.code
      );

      if (index > -1) {
        this.carriages[index] = updatedCarriage;
      }

      this.updateCarriagesService.updateCarriage(updatedCarriage).subscribe({
        next: response => {
          console.log('Carriage updated:', response);
          this.resetForm();
        },
        error: err => {
          console.error('Error: carriage not updated', err);
        },
      });

      this.resetForm();
    }
  }

  private resetForm() {
    this.prototypeForm.reset();
    this.isCreating = false;
    this.isUpdating = false;
    this.formDisplay = false;
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
    this.selectedCarriage = { ...carriage };

    console.log(this.selectedCarriage);

    this.prototypeForm.patchValue({
      name: this.selectedCarriage.name,
      rows: this.selectedCarriage.rows,
      leftSeats: this.selectedCarriage.leftSeats,
      rightSeats: this.selectedCarriage.rightSeats,
    });
  }

  public toggleFormDisplay() {
    this.formDisplay = !this.formDisplay;
  }
}
