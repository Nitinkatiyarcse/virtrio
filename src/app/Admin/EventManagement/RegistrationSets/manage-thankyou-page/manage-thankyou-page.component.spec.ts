import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageThankyouPageComponent } from './manage-thankyou-page.component';

describe('ManageThankyouPageComponent', () => {
  let component: ManageThankyouPageComponent;
  let fixture: ComponentFixture<ManageThankyouPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageThankyouPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageThankyouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
