import { TestBed } from '@angular/core/testing';

import { GetStationsService } from './get-stations.service';

describe('GetStationsService', () => {
  let service: GetStationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
