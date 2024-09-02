import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCreateFormComponent } from './route-create-form.component';

describe('RouteCreateFormComponent', () => {
  let component: RouteCreateFormComponent;
  let fixture: ComponentFixture<RouteCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteCreateFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
