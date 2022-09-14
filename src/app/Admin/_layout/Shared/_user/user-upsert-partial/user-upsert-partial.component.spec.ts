import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpsertPartialComponent } from './user-upsert-partial.component';

describe('UserUpsertPartialComponent', () => {
  let component: UserUpsertPartialComponent;
  let fixture: ComponentFixture<UserUpsertPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpsertPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpsertPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
