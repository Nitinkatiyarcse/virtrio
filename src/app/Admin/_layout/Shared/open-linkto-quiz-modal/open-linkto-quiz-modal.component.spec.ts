import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoQuizModalComponent } from './open-linkto-quiz-modal.component';

describe('OpenLinktoQuizModalComponent', () => {
  let component: OpenLinktoQuizModalComponent;
  let fixture: ComponentFixture<OpenLinktoQuizModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoQuizModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoQuizModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
