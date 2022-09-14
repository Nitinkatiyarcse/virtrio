import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoLeaderBoardwithinBoothModalComponent } from './open-linkto-leader-boardwithin-booth-modal.component';

describe('OpenLinktoLeaderBoardwithinBoothModalComponent', () => {
  let component: OpenLinktoLeaderBoardwithinBoothModalComponent;
  let fixture: ComponentFixture<OpenLinktoLeaderBoardwithinBoothModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoLeaderBoardwithinBoothModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoLeaderBoardwithinBoothModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
