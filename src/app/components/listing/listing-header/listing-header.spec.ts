import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingHeader } from './listing-header';

describe('ListingHeader', () => {
  let component: ListingHeader;
  let fixture: ComponentFixture<ListingHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
