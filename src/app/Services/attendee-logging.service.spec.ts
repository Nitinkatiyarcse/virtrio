import { TestBed } from '@angular/core/testing';

import { AttendeeLoggingService } from './attendee-logging.service';

describe('AttendeeLoggingService', () => {
  let service: AttendeeLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendeeLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
