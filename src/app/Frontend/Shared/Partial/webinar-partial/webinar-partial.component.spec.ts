import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarPartialComponent } from './webinar-partial.component';

describe('WebinarPartialComponent', () => {
  let component: WebinarPartialComponent;
  let fixture: ComponentFixture<WebinarPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
