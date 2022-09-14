import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRepresentativeAndStaffComponent } from './event-representative-and-staff.component';

describe('EventRepresentativeAndStaffComponent', () => {
  let component: EventRepresentativeAndStaffComponent;
  let fixture: ComponentFixture<EventRepresentativeAndStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRepresentativeAndStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRepresentativeAndStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
