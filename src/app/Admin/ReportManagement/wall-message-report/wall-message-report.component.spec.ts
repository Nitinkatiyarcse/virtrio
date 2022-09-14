import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallMessageReportComponent } from './wall-message-report.component';

describe('WallMessageReportComponent', () => {
  let component: WallMessageReportComponent;
  let fixture: ComponentFixture<WallMessageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallMessageReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallMessageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
