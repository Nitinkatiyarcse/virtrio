import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingAnnouncementReportComponent } from './messaging-announcement-report.component';

describe('MessagingAnnouncementReportComponent', () => {
  let component: MessagingAnnouncementReportComponent;
  let fixture: ComponentFixture<MessagingAnnouncementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagingAnnouncementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingAnnouncementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
