import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToChatQueueModalComponent } from './add-to-chat-queue-modal.component';

describe('AddToChatQueueModalComponent', () => {
  let component: AddToChatQueueModalComponent;
  let fixture: ComponentFixture<AddToChatQueueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToChatQueueModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToChatQueueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
