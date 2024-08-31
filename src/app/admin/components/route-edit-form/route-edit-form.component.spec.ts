import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEditFormComponent } from './route-edit-form.component';

describe('RouteEditFormComponent', () => {
  let component: RouteEditFormComponent;
  let fixture: ComponentFixture<RouteEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
