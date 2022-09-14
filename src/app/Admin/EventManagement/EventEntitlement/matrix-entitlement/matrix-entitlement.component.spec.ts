import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixEntitlementComponent } from './matrix-entitlement.component';

describe('MatrixEntitlementComponent', () => {
  let component: MatrixEntitlementComponent;
  let fixture: ComponentFixture<MatrixEntitlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixEntitlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixEntitlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
