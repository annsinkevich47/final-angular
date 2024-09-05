import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRideModalComponent } from './delete-ride-modal.component';

describe('DeleteRideModalComponent', () => {
  let component: DeleteRideModalComponent;
  let fixture: ComponentFixture<DeleteRideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteRideModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteRideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
