import { TestBed } from '@angular/core/testing';

import { GetterSetterService } from './getter-setter.service';

describe('GetterSetterService', () => {
  let service: GetterSetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetterSetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
