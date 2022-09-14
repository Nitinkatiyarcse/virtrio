import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitefriendReportComponent } from './invitefriend-report.component';

describe('InvitefriendReportComponent', () => {
  let component: InvitefriendReportComponent;
  let fixture: ComponentFixture<InvitefriendReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitefriendReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitefriendReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
