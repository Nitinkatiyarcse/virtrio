import { TestBed } from '@angular/core/testing';

import { EventEmailTemplatesService } from './event-email-templates.service';

describe('EventEmailTemplatesService', () => {
  let service: EventEmailTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventEmailTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
