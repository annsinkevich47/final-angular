import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditablePriceInputsComponent } from './editable-price-inputs.component';

describe('EditablePriceInputsComponent', () => {
  let component: EditablePriceInputsComponent;
  let fixture: ComponentFixture<EditablePriceInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditablePriceInputsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditablePriceInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
