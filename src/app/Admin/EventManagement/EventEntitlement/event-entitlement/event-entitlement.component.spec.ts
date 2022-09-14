import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEntitlementComponent } from './event-entitlement.component';

describe('EventEntitlementComponent', () => {
  let component: EventEntitlementComponent;
  let fixture: ComponentFixture<EventEntitlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEntitlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEntitlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
