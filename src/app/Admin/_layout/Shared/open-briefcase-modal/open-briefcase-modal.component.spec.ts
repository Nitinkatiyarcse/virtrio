import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenBriefcaseModalComponent } from './open-briefcase-modal.component';

describe('OpenBriefcaseModalComponent', () => {
  let component: OpenBriefcaseModalComponent;
  let fixture: ComponentFixture<OpenBriefcaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenBriefcaseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenBriefcaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
