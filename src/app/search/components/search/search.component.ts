import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, filter, Subscription } from 'rxjs';

import { ICity } from '../../models/models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
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
  private subscriptionFrom: Subscription | undefined;
  private subscriptionTo: Subscription | undefined;

  public citiesFrom: ICity[] = [];
  public citiesTo: ICity[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.currentDateTime = this.getActualTime();
    this.minCurrentDateTime = this.currentDateTime;
    this.searchForm.get('datetime')?.patchValue(this.currentDateTime);

    setInterval(() => {
      this.minCurrentDateTime = this.getActualTime();
    }, 10000);

    this.subscriptionFrom = this.setSubscriptionCityFind('cityFrom');
    this.subscriptionTo = this.setSubscriptionCityFind('cityTo', false);
  }

  setSubscriptionCityFind(name: string, isFrom: boolean = true) {
    return this.searchForm
      .get(name)
      ?.valueChanges.pipe(
        debounceTime(500),
        filter(value => {
          console.log(value);

          return value.length >= 3;
        }),
      )
      .subscribe(query => {
        this.searchService.getCities(query).subscribe((data: ICity[]) => {
          console.log(data);
          if (isFrom) {
            this.citiesFrom = [...data];
          } else {
            this.citiesTo = [...data];
          }
        });
      });
  }

  ngOnDestroy() {
    this.subscriptionFrom?.unsubscribe();
    this.subscriptionTo?.unsubscribe();
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
    if (!this.searchForm.invalid) {
      console.log('Valid');
    }
  }
}
