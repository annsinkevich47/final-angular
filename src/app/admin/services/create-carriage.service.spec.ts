import { TestBed } from '@angular/core/testing';

import { CreateCarriageService } from './create-carriage.service';

describe('CreateCarriageService', () => {
  let service: CreateCarriageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCarriageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
