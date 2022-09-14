import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IWebsiteframePartialComponent } from './website-iframe-partial.component';

describe('IImageframePartialComponent', () => {
  let component: IWebsiteframePartialComponent;
  let fixture: ComponentFixture<IWebsiteframePartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IWebsiteframePartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IWebsiteframePartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
