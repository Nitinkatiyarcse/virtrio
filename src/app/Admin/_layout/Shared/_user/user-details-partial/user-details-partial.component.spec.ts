import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsPartialComponent } from './user-details-partial.component';

describe('UserDetailsPartialComponent', () => {
  let component: UserDetailsPartialComponent;
  let fixture: ComponentFixture<UserDetailsPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
