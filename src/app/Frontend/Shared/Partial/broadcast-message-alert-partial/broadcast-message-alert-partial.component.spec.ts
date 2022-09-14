import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastMessageAlertPartialComponent } from './broadcast-message-alert-partial.component';

describe('BroadcastMessageAlertPartialComponent', () => {
  let component: BroadcastMessageAlertPartialComponent;
  let fixture: ComponentFixture<BroadcastMessageAlertPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastMessageAlertPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMessageAlertPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
