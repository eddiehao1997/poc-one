import { TestBed } from '@angular/core/testing';

import { DataTrafficService } from './data-traffic.service';

describe('DataTrafficService', () => {
  let service: DataTrafficService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTrafficService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
