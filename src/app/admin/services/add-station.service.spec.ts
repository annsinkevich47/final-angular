import { TestBed } from '@angular/core/testing';

import { AddStationService } from './add-station.service';

describe('AddStationService', () => {
  let service: AddStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
