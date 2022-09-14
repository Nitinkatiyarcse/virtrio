import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IImageframePartialComponent } from './image-iframe-partial.component';

describe('IImageframePartialComponent', () => {
  let component: IImageframePartialComponent;
  let fixture: ComponentFixture<IImageframePartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IImageframePartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IImageframePartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
