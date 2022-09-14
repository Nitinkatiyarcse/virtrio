import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoChatScreenModalComponent } from './open-linkto-chat-screen-modal.component';

describe('OpenLinktoChatScreenModalComponent', () => {
  let component: OpenLinktoChatScreenModalComponent;
  let fixture: ComponentFixture<OpenLinktoChatScreenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoChatScreenModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoChatScreenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
