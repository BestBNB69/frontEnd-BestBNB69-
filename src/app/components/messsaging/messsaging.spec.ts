import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Messsaging } from './messsaging';

describe('Messsaging', () => {
  let component: Messsaging;
  let fixture: ComponentFixture<Messsaging>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Messsaging]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Messsaging);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
