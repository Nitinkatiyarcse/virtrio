import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardManagementComponent } from './leaderboard-management.component';

describe('LeaderboardManagementComponent', () => {
  let component: LeaderboardManagementComponent;
  let fixture: ComponentFixture<LeaderboardManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
