import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinkContentModalComponent } from './open-link-content-modal.component';

describe('OpenLinkContentModalComponent', () => {
  let component: OpenLinkContentModalComponent;
  let fixture: ComponentFixture<OpenLinkContentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinkContentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinkContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
