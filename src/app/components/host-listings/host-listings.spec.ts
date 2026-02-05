import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostListings } from './host-listings';

describe('HostListings', () => {
  let component: HostListings;
  let fixture: ComponentFixture<HostListings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostListings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostListings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
