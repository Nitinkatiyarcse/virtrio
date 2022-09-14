import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoPrivateOneToOneMeetingModalComponent } from './open-linkto-private-one-to-one-meeting-modal.component';

describe('OpenLinktoPrivateOneToOneMeetingModalComponent', () => {
  let component: OpenLinktoPrivateOneToOneMeetingModalComponent;
  let fixture: ComponentFixture<OpenLinktoPrivateOneToOneMeetingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoPrivateOneToOneMeetingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoPrivateOneToOneMeetingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
