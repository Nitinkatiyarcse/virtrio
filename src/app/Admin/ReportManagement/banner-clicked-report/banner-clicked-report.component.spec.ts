import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerClickedReportComponent } from './banner-clicked-report.component';

describe('BannerClickedReportComponent', () => {
  let component: BannerClickedReportComponent;
  let fixture: ComponentFixture<BannerClickedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerClickedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerClickedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
