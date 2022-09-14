import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventTemplateComponent } from './create-event-template.component';

describe('CreateEventTemplateComponent', () => {
  let component: CreateEventTemplateComponent;
  let fixture: ComponentFixture<CreateEventTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEventTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
