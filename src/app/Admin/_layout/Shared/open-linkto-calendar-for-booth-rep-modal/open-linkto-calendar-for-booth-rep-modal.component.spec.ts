import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoCalendarForBoothRepModalComponent } from './open-linkto-calendar-for-booth-rep-modal.component';

describe('OpenLinktoCalendarForBoothRepModalComponent', () => {
  let component: OpenLinktoCalendarForBoothRepModalComponent;
  let fixture: ComponentFixture<OpenLinktoCalendarForBoothRepModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoCalendarForBoothRepModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoCalendarForBoothRepModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
