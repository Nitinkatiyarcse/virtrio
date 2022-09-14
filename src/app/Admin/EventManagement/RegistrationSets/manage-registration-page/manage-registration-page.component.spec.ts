import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegistrationPageComponent } from './manage-registration-page.component';

describe('ManageRegistrationPageComponent', () => {
  let component: ManageRegistrationPageComponent;
  let fixture: ComponentFixture<ManageRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRegistrationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
