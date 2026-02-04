import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingHostInfo } from './listing-host-info';

describe('ListingHostInfo', () => {
  let component: ListingHostInfo;
  let fixture: ComponentFixture<ListingHostInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingHostInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingHostInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
