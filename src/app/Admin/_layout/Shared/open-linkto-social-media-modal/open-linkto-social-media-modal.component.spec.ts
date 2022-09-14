import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoSocialMediaModalComponent } from './open-linkto-social-media-modal.component';

describe('OpenLinktoSocialMediaModalComponent', () => {
  let component: OpenLinktoSocialMediaModalComponent;
  let fixture: ComponentFixture<OpenLinktoSocialMediaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoSocialMediaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoSocialMediaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
