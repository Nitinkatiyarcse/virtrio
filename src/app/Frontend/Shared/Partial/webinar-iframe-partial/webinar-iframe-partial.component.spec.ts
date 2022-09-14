import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinarIframePartialComponent } from './webinar-iframe-partial.component';

describe('WebinarIframePartialComponent', () => {
  let component: WebinarIframePartialComponent;
  let fixture: ComponentFixture<WebinarIframePartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinarIframePartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinarIframePartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
