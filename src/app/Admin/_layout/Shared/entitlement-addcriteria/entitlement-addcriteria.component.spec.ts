import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementAddcriteriaComponent } from './entitlement-addcriteria.component';

describe('EntitlementAddcriteriaComponent', () => {
  let component: EntitlementAddcriteriaComponent;
  let fixture: ComponentFixture<EntitlementAddcriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitlementAddcriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitlementAddcriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
