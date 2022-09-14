import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTemplatesComponent } from './event-templates.component';

describe('EventTemplatesComponent', () => {
  let component: EventTemplatesComponent;
  let fixture: ComponentFixture<EventTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
