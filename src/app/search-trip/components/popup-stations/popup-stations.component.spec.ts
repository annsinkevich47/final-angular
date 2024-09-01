import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupStationsComponent } from './popup-stations.component';

describe('PopupStationsComponent', () => {
  let component: PopupStationsComponent;
  let fixture: ComponentFixture<PopupStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupStationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
