import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomRepresentativesComponent } from './room-representatives.component';

describe('RoomRepresentativesComponent', () => {
  let component: RoomRepresentativesComponent;
  let fixture: ComponentFixture<RoomRepresentativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomRepresentativesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomRepresentativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
