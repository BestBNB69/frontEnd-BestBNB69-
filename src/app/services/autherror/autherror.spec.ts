import { TestBed } from '@angular/core/testing';

import { Autherror } from './autherror';

describe('Autherror', () => {
  let service: Autherror;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Autherror);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
