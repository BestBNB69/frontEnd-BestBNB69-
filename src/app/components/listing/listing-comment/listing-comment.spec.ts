import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingComment } from './listing-comment';

describe('ListingComment', () => {
  let component: ListingComment;
  let fixture: ComponentFixture<ListingComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingComment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
