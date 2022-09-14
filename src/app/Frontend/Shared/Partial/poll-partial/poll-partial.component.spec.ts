import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollPartialComponent } from './poll-partial.component';

describe('PollPartialComponent', () => {
  let component: PollPartialComponent;
  let fixture: ComponentFixture<PollPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
