import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoWebinarModalComponent } from './open-linkto-webinar-modal.component';

describe('OpenLinktoWebinarModalComponent', () => {
  let component: OpenLinktoWebinarModalComponent;
  let fixture: ComponentFixture<OpenLinktoWebinarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoWebinarModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoWebinarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
