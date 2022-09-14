import { TestBed } from '@angular/core/testing';

import { BoothRepresentativeService } from './booth-representative.service';

describe('BoothRepresentativeService', () => {
  let service: BoothRepresentativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoothRepresentativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
