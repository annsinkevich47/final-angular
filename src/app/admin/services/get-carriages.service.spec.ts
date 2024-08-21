import { TestBed } from '@angular/core/testing';

import { GetCarriagesService } from './get-carriages.service';

describe('GetCarriagesService', () => {
  let service: GetCarriagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCarriagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
