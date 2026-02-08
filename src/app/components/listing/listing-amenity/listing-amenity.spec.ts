import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingAmenity } from './listing-amenity';

describe('ListingAmenity', () => {
  let component: ListingAmenity;
  let fixture: ComponentFixture<ListingAmenity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingAmenity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingAmenity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
