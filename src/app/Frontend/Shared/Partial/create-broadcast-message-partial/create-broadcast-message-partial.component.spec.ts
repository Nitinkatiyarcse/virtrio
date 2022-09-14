import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBroadcastMessagePartialComponent } from './create-broadcast-message-partial.component';

describe('CreateBroadcastMessagePartialComponent', () => {
  let component: CreateBroadcastMessagePartialComponent;
  let fixture: ComponentFixture<CreateBroadcastMessagePartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBroadcastMessagePartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBroadcastMessagePartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
