import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageToRepresentativePartialComponent } from './message-to-representative-partial.component';

describe('MessageToRepresentativePartialComponent', () => {
  let component: MessageToRepresentativePartialComponent;
  let fixture: ComponentFixture<MessageToRepresentativePartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageToRepresentativePartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageToRepresentativePartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
