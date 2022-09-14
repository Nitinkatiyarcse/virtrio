import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBoothReportComponent } from './top-booth-report.component';

describe('TopBoothReportComponent', () => {
  let component: TopBoothReportComponent;
  let fixture: ComponentFixture<TopBoothReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBoothReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBoothReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
