import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallattendedReportComponent } from './overallattended-report.component';

describe('OverallattendedReportComponent', () => {
  let component: OverallattendedReportComponent;
  let fixture: ComponentFixture<OverallattendedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallattendedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallattendedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
