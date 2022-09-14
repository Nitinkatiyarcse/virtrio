import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendedOndemandReportComponent } from './attended-ondemand-report.component';

describe('AttendedOndemandReportComponent', () => {
  let component: AttendedOndemandReportComponent;
  let fixture: ComponentFixture<AttendedOndemandReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendedOndemandReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendedOndemandReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
