import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomentryReportComponent } from './roomentry-report.component';

describe('RoomentryReportComponent', () => {
  let component: RoomentryReportComponent;
  let fixture: ComponentFixture<RoomentryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomentryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomentryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
