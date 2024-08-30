import { Injectable } from '@angular/core';

import { IStateCities } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class StateCityService {
  private state: IStateCities;

  constructor() {
    this.state = { cityFrom: '', cityTo: '' };
  }

  public setState(state: IStateCities) {
    this.state = state;
  }

  public getCityFrom() {
    return this.state.cityFrom;
  }

  public getCityTo() {
    return this.state.cityTo;
  }

  public isEmpty(): boolean {
    return !!(!this.state.cityFrom || !this.state.cityTo);
  }

  public getState() {
    return this.state;
  }
}
