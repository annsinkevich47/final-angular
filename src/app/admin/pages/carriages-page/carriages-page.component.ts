import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import CarriageType from '../../models/carriage';
import {
  createCarriage,
  loadCarriages,
  updateCarriage,
} from '../../redux/actions/carriages.actions';
import { selectAllCarriages } from '../../redux/selectors/carriages.selector';

@Component({
  selector: 'app-carriages-page',
  templateUrl: './carriages-page.component.html',
  styleUrls: ['./carriages-page.component.scss'],
})
export class CarriagesPageComponent implements OnInit {
  public carriages$!: Observable<CarriageType[]>;
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
    private store: Store,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carriages$ = this.store.select(selectAllCarriages);
    this.store.dispatch(loadCarriages());
    this.carriages$.subscribe(carriages => {
      this.carriages = carriages;
    });
    this.prototypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      rows: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.max(17),
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

    this.prototypeForm.valueChanges.subscribe(() => {
      this.updatePrototype();
    });
  }

  public getErrorMessage(formControlName: string): string {
    const control = this.prototypeForm.get(formControlName);
    if (control && control.touched && control.invalid) {
      switch (true) {
        case control.hasError('required'):
          return 'Field is required';
        case control.hasError('pattern'):
          return 'Please enter a number';
        case control.hasError('max'):
          return 'Incorrect number';
        default:
          return '';
      }
    }
    return '';
  }

  public onSubmit(): void {
    if (this.prototypeForm.valid) {
      const { name, rows, leftSeats, rightSeats } = this.prototypeForm.value;
      const newCarriage: CarriageType = {
        ...this.selectedCarriage,
        name,
        rows: Number(rows),
        leftSeats: Number(leftSeats),
        rightSeats: Number(rightSeats),
      };
      const newCarriageCreate: Omit<CarriageType, 'code'> = {
        name,
        rows: Number(rows),
        leftSeats: Number(leftSeats),
        rightSeats: Number(rightSeats),
      };
      if (this.isCreating) {
        this.store.dispatch(createCarriage({ carriage: newCarriageCreate }));
      } else {
        this.store.dispatch(updateCarriage({ carriage: newCarriage }));
        this.resetForm();
      }
      this.formDisplay = false;
      this.createPrototype = false;
    }
  }

  public onCreateCarriage(): void {
    if (this.formDisplay && !this.isUpdating) {
      this.formDisplay = false;
      return;
    }
    this.formDisplay = true;
    this.isCreating = true;
    this.isUpdating = false;
  }

  public onSelectCarriage(carriage: CarriageType): void {
    this.formDisplay = true;
    this.isCreating = false;
    this.isUpdating = true;
    this.selectedCarriage = { ...carriage };

    this.prototypeForm.patchValue({
      name: this.selectedCarriage.name,
      rows: this.selectedCarriage.rows,
      leftSeats: this.selectedCarriage.leftSeats,
      rightSeats: this.selectedCarriage.rightSeats,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private resetForm(): void {
    this.prototypeForm.reset();
    this.isCreating = false;
    this.isUpdating = false;
    this.formDisplay = false;
    this.createPrototype = false;
  }
  private updatePrototype(): void {
    if (this.prototypeForm.valid) {
      this.selectedCarriage = {
        ...this.selectedCarriage,
        name: this.prototypeForm.value.name,
        rows: Number(this.prototypeForm.value.rows),
        leftSeats: Number(this.prototypeForm.value.leftSeats),
        rightSeats: Number(this.prototypeForm.value.rightSeats),
      };
      this.createPrototype = true;
    }
  }
}
