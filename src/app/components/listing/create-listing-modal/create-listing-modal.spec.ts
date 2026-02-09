import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingModal } from './create-listing-modal';

describe('CreateListingModal', () => {
  let component: CreateListingModal;
  let fixture: ComponentFixture<CreateListingModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateListingModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateListingModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
