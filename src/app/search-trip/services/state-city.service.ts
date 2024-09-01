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

  public setState(state: IStateCities): void {
    this.state = state;
  }

  public getCityFrom(): string {
    return this.state.cityFrom;
  }

  public getCityTo(): string {
    return this.state.cityTo;
  }

  public isEmpty(): boolean {
    return !!(!this.state.cityFrom || !this.state.cityTo);
  }

  public getState(): IStateCities {
    return this.state;
  }
}
