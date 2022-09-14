import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConsumptionReportComponent } from './content-consumption-report.component';

describe('ContentConsumptionReportComponent', () => {
  let component: ContentConsumptionReportComponent;
  let fixture: ComponentFixture<ContentConsumptionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentConsumptionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentConsumptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
