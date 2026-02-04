import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingFeatures } from './listing-features';

describe('ListingFeatures', () => {
  let component: ListingFeatures;
  let fixture: ComponentFixture<ListingFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingFeatures]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingFeatures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
