import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPartialComponent } from './register-partial.component';

describe('RegisterPartialComponent', () => {
  let component: RegisterPartialComponent;
  let fixture: ComponentFixture<RegisterPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
