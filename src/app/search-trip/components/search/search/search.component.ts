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
  // private numberError: number = 999;

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
    // if (!this.searchForm.invalid) {
    //   const cityFrom: ICity[] = this.citiesFrom.filter(city => {
    //     return city.name === this.searchForm.get('cityFrom')?.value;
    //   });
    //   const citiesTo: ICity[] = this.citiesTo.filter(city => {
    //     return city.name === this.searchForm.get('cityTo')?.value;
    //   });

    const dateObject: Date = new Date(this.searchForm.get('datetime')?.value);
    const timestamp: number = dateObject.getTime();
    // const requestSearch: IRequestSearch = {
    //   fromLatitude:
    //     cityFrom.length === 0 ? this.numberError : cityFrom[0].latitude,
    //   fromLongitude:
    //     cityFrom.length === 0 ? this.numberError : cityFrom[0].longitude,
    //   toLatitude:
    //     citiesTo.length === 0 ? this.numberError : citiesTo[0].latitude,
    //   toLongitude:
    //     citiesTo.length === 0 ? this.numberError : citiesTo[0].longitude,
    //   time: timestamp,
    // };
    // const requestSearch: IRequestSearch = {
    //   fromLatitude: 66.71049150983345,
    //   fromLongitude: 60.82953046072217,
    //   toLatitude: 69.77028818846455,
    //   toLongitude: 64.52479439681153,
    //   time: timestamp,
    // };
    // const requestSearch: IRequestSearch = {
    //   fromLatitude: 7.211736816446816,
    //   fromLongitude: -132.93097998603827,
    //   toLatitude: -31.284400521466225,
    //   toLongitude: -154.69302105476976,
    //   time: timestamp,
    // };
    // const requestSearch: IRequestSearch = {
    //   fromLatitude: 53.703159346177586,
    //   fromLongitude: -120.26994055102456,
    //   toLatitude: 65.40389527161656,
    //   toLongitude: -90.2545054123769,
    //   time: timestamp,
    // };
    // const requestSearch: IRequestSearch = {
    //   fromLatitude: 34.043044121971235,
    //   fromLongitude: 19.86080459305535,
    //   toLatitude: 37.83825614316248,
    //   toLongitude: 3.9501738740867154,
    //   time: timestamp,
    // };
    // const requestSearch: IRequestSearch = {
    //   fromLatitude: -58.28859278772375,
    //   fromLongitude: 124.08742931243478,
    //   toLatitude: -88.18741167147087,
    //   toLongitude: -87.93864928674485,
    //   time: timestamp,
    // };
    // const requestSearch: IRequestSearch = {
    //   fromLatitude: -58.28859278772375,
    //   fromLongitude: 124.08742931243478,
    //   toLatitude: -70.5028109254797,
    //   toLongitude: 137.2716477099292,
    //   time: timestamp,
    // };
    // const requestSearch: IRequestSearch = {
    //   fromLatitude: -24.72121959958656,
    //   fromLongitude: 88.451538280357,
    //   toLatitude: -47.19311206515809,
    //   toLongitude: 54.26653003956619,
    //   time: timestamp,
    // };
    // const requestSearch: IRequestSearch = {
    //   fromLatitude: 66.71049150983345,
    //   fromLongitude: 60.82953046072217,
    //   toLatitude: 65.10986138733989,
    //   toLongitude: 53.82109270977992,
    //   time: timestamp,
    // };
    const requestSearch: IRequestSearch = {
      fromLatitude: -14.629666627535528,
      fromLongitude: -27.4683663943201,
      toLatitude: 8.682780278358095,
      toLongitude: -5.177550642642302,
      time: timestamp,
    };

    this.searchService.setSchedule(requestSearch);
  }
  // }
}
