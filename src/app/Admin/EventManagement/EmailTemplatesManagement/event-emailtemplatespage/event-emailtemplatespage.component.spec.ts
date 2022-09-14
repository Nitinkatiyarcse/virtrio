import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEmailtemplatespageComponent } from './event-emailtemplatespage.component';

describe('EventEmailtemplatespageComponent', () => {
  let component: EventEmailtemplatespageComponent;
  let fixture: ComponentFixture<EventEmailtemplatespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEmailtemplatespageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEmailtemplatespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
