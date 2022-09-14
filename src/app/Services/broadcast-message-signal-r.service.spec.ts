import { TestBed } from '@angular/core/testing';

import { BroadcastMessageSignalRService } from './broadcast-message-signal-r.service';

describe('BroadcastMessageSignalRService', () => {
  let service: BroadcastMessageSignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadcastMessageSignalRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
