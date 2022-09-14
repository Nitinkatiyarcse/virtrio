import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnedInvitationEmailPartialComponent } from './sned-invitation-email-partial.component';

describe('SnedInvitationEmailPartialComponent', () => {
  let component: SnedInvitationEmailPartialComponent;
  let fixture: ComponentFixture<SnedInvitationEmailPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnedInvitationEmailPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnedInvitationEmailPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
