import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBadgeComponent } from './update-badge.component';

describe('UpdateBadgeComponent', () => {
  let component: UpdateBadgeComponent;
  let fixture: ComponentFixture<UpdateBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
