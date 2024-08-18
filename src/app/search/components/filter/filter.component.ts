import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  private readonly daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  public cards: ICardFilter[] = [];

  constructor(private readonly searchService: SearchService) {}

  ngOnInit(): void {
    this.subscriptionFilter = this.searchService.dateFilter$.subscribe(
      value => {
        console.log(value);

        this.generateCards(value);
      },
    );
  }

  ngOnDestroy(): void {
    this.subscriptionFilter?.unsubscribe();
  }

  // eslint-disable-next-line class-methods-use-this
  getUniqueDates(dates: string[]) {
    const uniqueDays = new Set();

    return dates
      .filter(date => {
        const day = date.split('T')[0];
        if (!uniqueDays.has(day)) {
          uniqueDays.add(day);
          return true;
        }
        return false;
      })
      .sort();
  }

  generateCards(arrayDate: string[]) {
    const copyArrayDate = this.getUniqueDates(arrayDate);
    this.cards.length = 0;
    for (let index = 0; index < copyArrayDate.length; index += 1) {
      const date = new Date(copyArrayDate[index]);
      const options = { month: 'long', day: 'numeric' } as const;
      const formattedDate = date.toLocaleDateString('en-EN', options);
      const dayName = this.daysOfWeek[date.getDay()];

      this.cards.push({ date: formattedDate, dayName, id: index });
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

  setActiveCard(id: number) {
    this.idActiveCard = id;
  }
}
