import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSponsorsComponent } from './event-sponsors.component';

describe('EventSponsorsComponent', () => {
  let component: EventSponsorsComponent;
  let fixture: ComponentFixture<EventSponsorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSponsorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
