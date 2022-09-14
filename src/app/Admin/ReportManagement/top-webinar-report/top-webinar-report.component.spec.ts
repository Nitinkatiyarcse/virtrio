import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWebinarReportComponent } from './top-webinar-report.component';

describe('TopWebinarReportComponent', () => {
  let component: TopWebinarReportComponent;
  let fixture: ComponentFixture<TopWebinarReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopWebinarReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopWebinarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
