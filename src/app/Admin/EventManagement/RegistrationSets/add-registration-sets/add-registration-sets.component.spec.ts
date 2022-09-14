import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistrationSetsComponent } from './add-registration-sets.component';

describe('AddRegistrationSetsComponent', () => {
  let component: AddRegistrationSetsComponent;
  let fixture: ComponentFixture<AddRegistrationSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegistrationSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegistrationSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
