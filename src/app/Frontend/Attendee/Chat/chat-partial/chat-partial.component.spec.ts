import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPartialComponent } from './chat-partial.component';

describe('ChatPartialComponent', () => {
  let component: ChatPartialComponent;
  let fixture: ComponentFixture<ChatPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
