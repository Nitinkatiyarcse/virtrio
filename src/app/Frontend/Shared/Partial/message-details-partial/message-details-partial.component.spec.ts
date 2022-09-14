import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDetailsPartialComponent } from './message-details-partial.component';

describe('MessageDetailsPartialComponent', () => {
  let component: MessageDetailsPartialComponent;
  let fixture: ComponentFixture<MessageDetailsPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDetailsPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDetailsPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
