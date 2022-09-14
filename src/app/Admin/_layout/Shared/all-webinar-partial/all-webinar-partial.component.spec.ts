import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWebinarPartialComponent } from './all-webinar-partial.component';

describe('AllWebinarPartialComponent', () => {
  let component: AllWebinarPartialComponent;
  let fixture: ComponentFixture<AllWebinarPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWebinarPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWebinarPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
