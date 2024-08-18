import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, filter, Subscription } from 'rxjs';

import { ICity, IRequestSearch } from '../../models/models';
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
  private readonly numberError = 999;

  public citiesFrom: ICity[] = [];
  public citiesTo: ICity[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.currentDateTime = this.getActualTime();
    this.minCurrentDateTime = this.getMinDateTime();
    this.searchForm.get('datetime')?.patchValue(this.currentDateTime);

    this.subscriptionFrom = this.setSubscriptionCityFind('cityFrom');
    this.subscriptionTo = this.setSubscriptionCityFind('cityTo', false);
  }

  setSubscriptionCityFind(name: string, isFrom: boolean = true) {
    return this.searchForm
      .get(name)
      ?.valueChanges.pipe(
        debounceTime(500),
        filter(value => {
          return value.length >= 3;
        }),
      )
      .subscribe(query => {
        this.searchService.getCities(query).subscribe((cities: ICity[]) => {
          // this.searchService.saveCities(cities);
          if (isFrom) {
            this.citiesFrom = [...cities];
          } else {
            this.citiesTo = [...cities];
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
  getMinDateTime() {
    const now = new Date();
    now.setHours(3, 0, 0, 0);
    return now.toISOString().slice(0, 16);
  }

  // eslint-disable-next-line class-methods-use-this
  pastDateValidator(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const currentDateTime = new Date();
    currentDateTime.setHours(3, 0, 0, 0);
    currentDateTime.setMinutes(currentDateTime.getMinutes() - 1);

    const inputDateTime = new Date(control.value);
    inputDateTime.setHours(3, 0, 0, 0);
    return inputDateTime < currentDateTime ? { pastDate: true } : null;
  }

  search() {
    // if (!this.searchForm.invalid) {
    //   const cityFrom: ICity[] = this.citiesFrom.filter(city => {
    //     return city.name === this.searchForm.get('cityFrom')?.value;
    //   });
    //   const citiesTo: ICity[] = this.citiesTo.filter(city => {
    //     return city.name === this.searchForm.get('cityTo')?.value;
    //   });

    const dateObject: Date = new Date(this.searchForm.get('datetime')?.value);
    const timestamp: number = dateObject.getTime();
    //   const requestSearch: IRequestSearch = {
    //     fromLatitude:
    //       cityFrom.length === 0 ? this.numberError : cityFrom[0].latitude,
    //     fromLongitude:
    //       cityFrom.length === 0 ? this.numberError : cityFrom[0].longitude,
    //     toLatitude:
    //       citiesTo.length === 0 ? this.numberError : citiesTo[0].latitude,
    //     toLongitude:
    //       citiesTo.length === 0 ? this.numberError : citiesTo[0].longitude,
    //     time: timestamp,
    //   };
    const requestSearch: IRequestSearch = {
      fromLatitude: 53.5747,
      fromLongitude: 7.7808,
      toLatitude: 50.72,
      toLongitude: -1.88,
      time: timestamp,
    };

    console.log(requestSearch);

    this.searchService.setSchedule(requestSearch);
  }
}
