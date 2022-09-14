import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WabinarAccessReportComponent } from './wabinar-access-report.component';

describe('WabinarAccessReportComponent', () => {
  let component: WabinarAccessReportComponent;
  let fixture: ComponentFixture<WabinarAccessReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WabinarAccessReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WabinarAccessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
