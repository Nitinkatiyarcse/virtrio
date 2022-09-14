import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConsumReportComponent } from './content-consum-report.component';

describe('ContentConsumReportComponent', () => {
  let component: ContentConsumReportComponent;
  let fixture: ComponentFixture<ContentConsumReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentConsumReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentConsumReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
