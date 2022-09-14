import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistrationSharedLayoutComponent } from './login-registration-shared-layout.component';

describe('LoginRegistrationSharedLayoutComponent', () => {
  let component: LoginRegistrationSharedLayoutComponent;
  let fixture: ComponentFixture<LoginRegistrationSharedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegistrationSharedLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegistrationSharedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
