import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAttendeesComponent } from './approve-attendees.component';

describe('ApproveAttendeesComponent', () => {
  let component: ApproveAttendeesComponent;
  let fixture: ComponentFixture<ApproveAttendeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAttendeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAttendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
