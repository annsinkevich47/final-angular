import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelOrderModalComponent } from './cancel-order-modal.component';

describe('CancelOrderModalComponent', () => {
  let component: CancelOrderModalComponent;
  let fixture: ComponentFixture<CancelOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelOrderModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
