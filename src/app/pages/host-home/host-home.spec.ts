import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostHome } from './host-home';

describe('HostHome', () => {
  let component: HostHome;
  let fixture: ComponentFixture<HostHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
