import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup = new FormGroup({
    cityFrom: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    cityTo: new FormControl('', [Validators.required, Validators.minLength(2)]),
    datetime: new FormControl('', [
      Validators.required,
      this.pastDateValidator,
    ]),
  });
  public currentDateTime: string | undefined;
  public minCurrentDateTime: string | undefined;
  public isSearch = false;

  ngOnInit(): void {
    this.currentDateTime = this.getActualTime();
    this.minCurrentDateTime = this.currentDateTime;

    setInterval(() => {
      this.minCurrentDateTime = this.getActualTime();
    }, 10000);
  }

  get getForm() {
    return this.searchForm.controls;
  }

  // eslint-disable-next-line class-methods-use-this
  getActualTime() {
    const now = new Date();
    now.setHours(now.getHours() + 3);
    return now.toISOString().slice(0, 16);
  }

  // eslint-disable-next-line class-methods-use-this
  pastDateValidator(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const currentDateTime = new Date();
    currentDateTime.setMinutes(currentDateTime.getMinutes() - 1);
    const inputDateTime = new Date(control.value);
    return inputDateTime < currentDateTime ? { pastDate: true } : null;
  }

  search() {
    this.isSearch = true;

    if (!this.searchForm.invalid) {
      console.log('Valid');
    }
  }
}
