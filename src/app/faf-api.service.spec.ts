import {TestBed} from '@angular/core/testing';

import {FafApiService} from './faf-api.service';

describe('FafApiService', () => {
  let service: FafApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FafApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
