import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPartialComponent } from './survey-partial.component';

describe('SurveyPartialComponent', () => {
  let component: SurveyPartialComponent;
  let fixture: ComponentFixture<SurveyPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
