import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSharingReportComponent } from './social-sharing-report.component';

describe('SocialSharingReportComponent', () => {
  let component: SocialSharingReportComponent;
  let fixture: ComponentFixture<SocialSharingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialSharingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSharingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
