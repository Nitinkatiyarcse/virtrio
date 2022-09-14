import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframePartialComponent } from './iframe-partial.component';

describe('IframePartialComponent', () => {
  let component: IframePartialComponent;
  let fixture: ComponentFixture<IframePartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframePartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframePartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
