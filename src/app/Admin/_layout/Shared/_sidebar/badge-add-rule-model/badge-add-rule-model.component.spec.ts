import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeAddRuleModelComponent } from './badge-add-rule-model.component';

describe('BadgeAddRuleModelComponent', () => {
  let component: BadgeAddRuleModelComponent;
  let fixture: ComponentFixture<BadgeAddRuleModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeAddRuleModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeAddRuleModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
