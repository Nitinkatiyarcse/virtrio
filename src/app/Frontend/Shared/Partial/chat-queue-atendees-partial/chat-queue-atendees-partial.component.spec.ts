import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatQueueAtendeesPartialComponent } from './chat-queue-atendees-partial.component';

describe('ChatQueueAtendeesPartialComponent', () => {
  let component: ChatQueueAtendeesPartialComponent;
  let fixture: ComponentFixture<ChatQueueAtendeesPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatQueueAtendeesPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatQueueAtendeesPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
