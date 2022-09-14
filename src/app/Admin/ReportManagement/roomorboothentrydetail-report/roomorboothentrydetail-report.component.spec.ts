import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOrBoothEntryDetailReportComponent } from './roomorboothentrydetail-report.component';

describe('RoomOrBoothEntryDetailReportComponent', () => {
  let component: RoomOrBoothEntryDetailReportComponent;
  let fixture: ComponentFixture<RoomOrBoothEntryDetailReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomOrBoothEntryDetailReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomOrBoothEntryDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
