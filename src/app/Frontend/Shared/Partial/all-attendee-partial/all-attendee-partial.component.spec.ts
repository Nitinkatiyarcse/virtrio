import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttendeePartialComponent } from './all-attendee-partial.component';

describe('AllAttendeePartialComponent', () => {
  let component: AllAttendeePartialComponent;
  let fixture: ComponentFixture<AllAttendeePartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAttendeePartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAttendeePartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
