import { TestBed } from '@angular/core/testing';

import { EventEntitlementService } from './event-entitlement.service';

describe('EventEntitlementService', () => {
  let service: EventEntitlementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventEntitlementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
