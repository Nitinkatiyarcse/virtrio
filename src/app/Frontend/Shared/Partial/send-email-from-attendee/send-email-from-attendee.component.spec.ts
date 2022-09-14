import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailFromAttendeeComponent } from './send-email-from-attendee.component';

describe('SendEmailFromAttendeeComponent', () => {
  let component: SendEmailFromAttendeeComponent;
  let fixture: ComponentFixture<SendEmailFromAttendeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailFromAttendeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailFromAttendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
