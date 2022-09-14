import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentativeDashboardComponent } from './representative-dashboard.component';

describe('RepresentativeDashboardComponent', () => {
  let component: RepresentativeDashboardComponent;
  let fixture: ComponentFixture<RepresentativeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepresentativeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentativeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
