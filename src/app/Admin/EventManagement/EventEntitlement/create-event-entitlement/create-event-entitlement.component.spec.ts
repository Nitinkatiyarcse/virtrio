import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventEntitlementComponent } from './create-event-entitlement.component';

describe('CreateEventEntitlementComponent', () => {
  let component: CreateEventEntitlementComponent;
  let fixture: ComponentFixture<CreateEventEntitlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventEntitlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventEntitlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
