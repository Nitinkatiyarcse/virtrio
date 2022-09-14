import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSpacesReportComponent } from './top-spaces-report.component';

describe('TopSpacesReportComponent', () => {
  let component: TopSpacesReportComponent;
  let fixture: ComponentFixture<TopSpacesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSpacesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSpacesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
