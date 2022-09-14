import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPartialComponent } from './quiz-partial.component';

describe('QuizPartialComponent', () => {
  let component: QuizPartialComponent;
  let fixture: ComponentFixture<QuizPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
