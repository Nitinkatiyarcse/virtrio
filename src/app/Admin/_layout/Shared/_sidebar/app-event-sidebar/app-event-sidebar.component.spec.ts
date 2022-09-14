import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEventSidebarComponent } from './app-event-sidebar.component';

describe('AppEventSidebarComponent', () => {
  let component: AppEventSidebarComponent;
  let fixture: ComponentFixture<AppEventSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppEventSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEventSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
