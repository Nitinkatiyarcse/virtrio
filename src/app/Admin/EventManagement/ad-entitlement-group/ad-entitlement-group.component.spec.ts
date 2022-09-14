import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdEntitlementGroupComponent } from './ad-entitlement-group.component';

describe('AdEntitlementGroupComponent', () => {
  let component: AdEntitlementGroupComponent;
  let fixture: ComponentFixture<AdEntitlementGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdEntitlementGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdEntitlementGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
