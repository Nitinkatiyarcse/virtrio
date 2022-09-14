import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoSurveyModalComponent } from './open-linkto-survey-modal.component';

describe('OpenLinktoSurveyModalComponent', () => {
  let component: OpenLinktoSurveyModalComponent;
  let fixture: ComponentFixture<OpenLinktoSurveyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoSurveyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoSurveyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
