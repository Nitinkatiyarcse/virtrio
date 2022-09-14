import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSponsorDetailsComponent } from './event-sponsor-details.component';

describe('EventSponsorDetailsComponent', () => {
  let component: EventSponsorDetailsComponent;
  let fixture: ComponentFixture<EventSponsorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSponsorDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSponsorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
