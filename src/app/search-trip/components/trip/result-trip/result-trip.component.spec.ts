import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTripComponent } from './result-trip.component';

describe('ResultComponent', () => {
  let component: ResultTripComponent;
  let fixture: ComponentFixture<ResultTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultTripComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
