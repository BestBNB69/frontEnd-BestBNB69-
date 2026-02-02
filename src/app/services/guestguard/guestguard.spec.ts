import { TestBed } from '@angular/core/testing';

import { Guestguard } from './guestguard';

describe('Guestguard', () => {
  let service: Guestguard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Guestguard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
