import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { getDaydate } from '../../consts/consts';
import { ICardFilter } from '../../models/models';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit, OnDestroy {
  public currentIndex = 0;
  public itemsPerPage = 4;
  public idActiveCard = 0;
  public subscriptionFilter: Subscription | undefined;

  public cards: ICardFilter[] = [];

  constructor(private readonly searchService: SearchService) {}

  ngOnInit(): void {
    this.subscriptionFilter = this.searchService.dateFilter$.subscribe(
      value => {
        this.generateCards(value);
      },
    );
  }

  ngOnDestroy(): void {
    this.subscriptionFilter?.unsubscribe();
  }

  generateCards(arrayDate: string[]) {
    this.cards.length = 0;
    for (let index = 0; index < arrayDate.length; index += 1) {
      const { date, dayName } = getDaydate(arrayDate[index]);

      this.cards.push({
        date,
        dayName,
        id: index,
        dateBase: arrayDate[index],
      });
    }
  }

  get visibleCards() {
    const start = this.currentIndex * this.itemsPerPage;
    return this.cards.slice(start, start + this.itemsPerPage);
  }

  nextCards() {
    if ((this.currentIndex + 1) * this.itemsPerPage < this.cards.length) {
      this.currentIndex += 1;
    }
  }

  prevCards() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }

  setActiveCard(id: number, dateBase: string) {
    this.idActiveCard = id;
    this.searchService.setActualDate(dateBase);
  }
}
