import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkWebsiteComponent } from './link-website.component';

describe('LinkWebsiteComponent', () => {
  let component: LinkWebsiteComponent;
  let fixture: ComponentFixture<LinkWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkWebsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
