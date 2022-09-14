import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoInfoCardModalComponent } from './open-linkto-info-card-modal.component';

describe('OpenLinktoInfoCardModalComponent', () => {
  let component: OpenLinktoInfoCardModalComponent;
  let fixture: ComponentFixture<OpenLinktoInfoCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoInfoCardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoInfoCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
