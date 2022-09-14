import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAdminusersComponent } from './event-adminusers.component';

describe('EventAdminusersComponent', () => {
  let component: EventAdminusersComponent;
  let fixture: ComponentFixture<EventAdminusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventAdminusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAdminusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
