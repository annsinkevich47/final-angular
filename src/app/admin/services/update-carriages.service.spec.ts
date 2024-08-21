import { TestBed } from '@angular/core/testing';

import { UpdateCarriagesService } from './update-carriages.service';

describe('UpdateCarriagesService', () => {
  let service: UpdateCarriagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCarriagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
