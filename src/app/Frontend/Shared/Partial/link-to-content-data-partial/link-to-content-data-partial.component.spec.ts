import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkToContentPartialComponent } from './link-to-content-data-partial.component';

describe('LinkToContentPartialComponent', () => {
  let component: LinkToContentPartialComponent;
  let fixture: ComponentFixture<LinkToContentPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkToContentPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkToContentPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
