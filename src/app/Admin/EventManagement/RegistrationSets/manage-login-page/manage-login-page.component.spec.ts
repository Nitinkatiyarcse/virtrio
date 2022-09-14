import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLoginPageComponent } from './manage-login-page.component';

describe('ManageLoginPageComponent', () => {
  let component: ManageLoginPageComponent;
  let fixture: ComponentFixture<ManageLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLoginPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
