import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostUser } from './host-user';

describe('HostUser', () => {
  let component: HostUser;
  let fixture: ComponentFixture<HostUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
