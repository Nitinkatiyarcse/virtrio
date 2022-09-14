import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSummaryReportComponent } from './quick-summary-report.component';

describe('QuickSummaryReportComponent', () => {
  let component: QuickSummaryReportComponent;
  let fixture: ComponentFixture<QuickSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickSummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
