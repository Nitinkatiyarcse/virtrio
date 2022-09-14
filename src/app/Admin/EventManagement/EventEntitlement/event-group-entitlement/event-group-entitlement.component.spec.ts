import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGroupEntitlementComponent } from './event-group-entitlement.component';

describe('EventGroupEntitlementComponent', () => {
  let component: EventGroupEntitlementComponent;
  let fixture: ComponentFixture<EventGroupEntitlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventGroupEntitlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGroupEntitlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
