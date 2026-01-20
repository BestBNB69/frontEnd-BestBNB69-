import { TestBed } from '@angular/core/testing';

import { Roleguard } from './roleguard';

describe('Roleguard', () => {
  let service: Roleguard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Roleguard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
