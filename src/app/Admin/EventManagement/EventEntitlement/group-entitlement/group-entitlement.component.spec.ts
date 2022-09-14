import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEntitlementComponent } from './group-entitlement.component';

describe('GroupEntitlementComponent', () => {
  let component: GroupEntitlementComponent;
  let fixture: ComponentFixture<GroupEntitlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupEntitlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEntitlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
