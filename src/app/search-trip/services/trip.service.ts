import { Injectable } from '@angular/core';

import { ICardResult } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  public card: ICardResult | null = null;

  public save(card: ICardResult): void {
    this.card = card;
  }
}
