import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageItemComponent } from './carriage-item.component';

describe('CarriageItemComponent', () => {
  let component: CarriageItemComponent;
  let fixture: ComponentFixture<CarriageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarriageItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
