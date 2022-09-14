import { TestBed } from '@angular/core/testing';

import { EventSponsorsService } from './event-sponsors.service';

describe('EventSponsorsService', () => {
  let service: EventSponsorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSponsorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
