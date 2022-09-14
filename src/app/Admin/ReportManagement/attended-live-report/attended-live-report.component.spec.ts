import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendedLiveReportComponent } from './attended-live-report.component';

describe('AttendedLiveReportComponent', () => {
  let component: AttendedLiveReportComponent;
  let fixture: ComponentFixture<AttendedLiveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendedLiveReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendedLiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
