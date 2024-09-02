import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, filter, Subscription } from 'rxjs';

import { ICity, IRequestSearch } from '../../../models/models';
import { SearchService } from '../../../services/search.service';
import { StateCityService } from '../../../services/state-city.service';

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
  private numberError: number = 999;

  constructor(
    private searchService: SearchService,
    private stateSearch: StateCityService,
  ) {}

  public ngOnInit(): void {
    this.currentDateTime = this.getActualTime();
    this.minCurrentDateTime = this.getMinDateTime();
    this.searchForm.get('datetime')?.patchValue(this.currentDateTime);
    this.searchForm.get('cityFrom')?.patchValue(this.stateSearch.getCityFrom());
    this.searchForm.get('cityTo')?.patchValue(this.stateSearch.getCityTo());

    if (!this.stateSearch.isEmpty()) {
      this.search();
    }

    this.subscriptionFrom = this.setSubscriptionCityFind('cityFrom');
    this.subscriptionTo = this.setSubscriptionCityFind('cityTo', false);
  }

  private setSubscriptionCityFind(
    name: string,
    isFrom: boolean = true,
  ): Subscription | undefined {
    return this.searchForm
      .get(name)
      ?.valueChanges.pipe(
        debounceTime(200),
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

  public ngOnDestroy(): void {
    this.subscriptionFrom?.unsubscribe();
    this.subscriptionTo?.unsubscribe();
  }

  get getForm(): {
    [key: string]: AbstractControl;
  } {
    return this.searchForm.controls;
  }

  private getActualTime(): string {
    const now = new Date();
    now.setHours(now.getHours() + 3);
    return now.toISOString().slice(0, 16);
  }

  private getMinDateTime(): string {
    const now = new Date();
    now.setHours(3, 0, 0, 0);
    return now.toISOString().slice(0, 16);
  }

  private pastDateValidator(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const currentDateTime = new Date();
    currentDateTime.setHours(3, 0, 0, 0);
    currentDateTime.setMinutes(currentDateTime.getMinutes() - 1);

    const inputDateTime = new Date(control.value);
    inputDateTime.setHours(3, 0, 0, 0);
    return inputDateTime < currentDateTime ? { pastDate: true } : null;
  }

  public search(): void {
    this.stateSearch.setState({
      cityFrom: this.searchForm.get('cityFrom')?.value,
      cityTo: this.searchForm.get('cityTo')?.value,
    });
    if (!this.searchForm.invalid) {
      const cityFrom: ICity[] = this.citiesFrom.filter(city => {
        return city.name === this.searchForm.get('cityFrom')?.value;
      });
      const citiesTo: ICity[] = this.citiesTo.filter(city => {
        return city.name === this.searchForm.get('cityTo')?.value;
      });

      const dateObject: Date = new Date(this.searchForm.get('datetime')?.value);
      const timestamp: number = dateObject.getTime();
      const requestSearch: IRequestSearch = {
        fromLatitude:
          cityFrom.length === 0 ? this.numberError : cityFrom[0].latitude,
        fromLongitude:
          cityFrom.length === 0 ? this.numberError : cityFrom[0].longitude,
        toLatitude:
          citiesTo.length === 0 ? this.numberError : citiesTo[0].latitude,
        toLongitude:
          citiesTo.length === 0 ? this.numberError : citiesTo[0].longitude,
        time: timestamp,
      };

      // const requestSearch: IRequestSearch = {
      //   fromLatitude: 43.7840359693642,
      //   fromLongitude: 79.56373546072763,
      //   toLatitude: 19.469123277681717,
      //   toLongitude: 124.83177248617699,
      //   time: timestamp,
      // };

      this.searchService.setSchedule(requestSearch);
    }
  }
}
