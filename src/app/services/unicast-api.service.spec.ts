import { TestBed } from '@angular/core/testing';

import { UnicastAPIService } from './unicast-api.service';

describe('UnicastAPIService', () => {
  let service: UnicastAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnicastAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
