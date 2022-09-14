import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickactionsReportComponent } from './clickactions-report.component';

describe('ClickactionsReportComponent', () => {
  let component: ClickactionsReportComponent;
  let fixture: ComponentFixture<ClickactionsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickactionsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickactionsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
