import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegistrationSetsComponent } from './manage-registration-sets.component';

describe('ManageRegistrationSetsComponent', () => {
  let component: ManageRegistrationSetsComponent;
  let fixture: ComponentFixture<ManageRegistrationSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRegistrationSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRegistrationSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
