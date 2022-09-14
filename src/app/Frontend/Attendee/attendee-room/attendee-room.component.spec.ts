import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeRoomComponent } from './attendee-room.component';

describe('AttendeeRoomComponent', () => {
  let component: AttendeeRoomComponent;
  let fixture: ComponentFixture<AttendeeRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendeeRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendeeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
