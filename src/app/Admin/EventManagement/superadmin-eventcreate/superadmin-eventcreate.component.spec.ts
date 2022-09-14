import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminEventcreateComponent } from './superadmin-eventcreate.component';

describe('SuperadminEventcreateComponent', () => {
  let component: SuperadminEventcreateComponent;
  let fixture: ComponentFixture<SuperadminEventcreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminEventcreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminEventcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
