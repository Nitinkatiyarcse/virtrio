import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDocumentsReportComponent } from './top-documents-report.component';

describe('TopDocumentsReportComponent', () => {
  let component: TopDocumentsReportComponent;
  let fixture: ComponentFixture<TopDocumentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopDocumentsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDocumentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
