import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDatepicker } from './listing-datepicker';

describe('ListingDatepicker', () => {
  let component: ListingDatepicker;
  let fixture: ComponentFixture<ListingDatepicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingDatepicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingDatepicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
