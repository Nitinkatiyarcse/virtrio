import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkLocationComponent } from './link-location.component';

describe('LinkLocationComponent', () => {
  let component: LinkLocationComponent;
  let fixture: ComponentFixture<LinkLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
