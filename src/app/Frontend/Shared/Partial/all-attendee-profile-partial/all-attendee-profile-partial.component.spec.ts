import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttendeeProfilePartialComponent } from './all-attendee-profile-partial.component';

describe('AllAttendeeProfilePartialComponent', () => {
  let component: AllAttendeeProfilePartialComponent;
  let fixture: ComponentFixture<AllAttendeeProfilePartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAttendeeProfilePartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAttendeeProfilePartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
