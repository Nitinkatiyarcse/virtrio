import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDurationByRoomReportComponent } from './total-duration-by-room-report.component';

describe('TotalDurationByRoomReportComponent', () => {
  let component: TotalDurationByRoomReportComponent;
  let fixture: ComponentFixture<TotalDurationByRoomReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalDurationByRoomReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalDurationByRoomReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
