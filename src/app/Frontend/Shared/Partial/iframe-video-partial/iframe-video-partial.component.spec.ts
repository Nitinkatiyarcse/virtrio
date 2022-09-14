import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeVideoPartialComponent } from './iframe-video-partial.component';

describe('IframeVideoPartialComponent', () => {
  let component: IframeVideoPartialComponent;
  let fixture: ComponentFixture<IframeVideoPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframeVideoPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeVideoPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
