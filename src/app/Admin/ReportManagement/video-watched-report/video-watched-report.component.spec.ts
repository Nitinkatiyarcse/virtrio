import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoWatchedReportComponent } from './video-watched-report.component';

describe('VideoWatchedReportComponent', () => {
  let component: VideoWatchedReportComponent;
  let fixture: ComponentFixture<VideoWatchedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoWatchedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoWatchedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
