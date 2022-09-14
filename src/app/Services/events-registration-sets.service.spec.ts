import { TestBed } from '@angular/core/testing';

import { EventsRegistrationSetsService } from './events-registration-sets.service';

describe('EventsRegistrationSetsService', () => {
  let service: EventsRegistrationSetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsRegistrationSetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
