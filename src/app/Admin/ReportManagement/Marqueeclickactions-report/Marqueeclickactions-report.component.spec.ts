import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeClickactionsReportComponent } from './Marqueeclickactions-report.component';

describe('ClickactionsReportComponent', () => {
  let component: MarqueeClickactionsReportComponent;
  let fixture: ComponentFixture<MarqueeClickactionsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarqueeClickactionsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueeClickactionsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
