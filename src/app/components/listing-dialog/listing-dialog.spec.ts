import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingDialog } from './listing-dialog';

describe('ListingDialog', () => {
  let component: ListingDialog;
  let fixture: ComponentFixture<ListingDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
