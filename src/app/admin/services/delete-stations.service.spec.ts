import { TestBed } from '@angular/core/testing';

import { DeleteStationsService } from './delete-stations.service';

describe('DeleteStationsService', () => {
  let service: DeleteStationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteStationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
