import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothDetailsPartialComponent } from './booth-details-partial.component';

describe('BoothDetailsPartialComponent', () => {
  let component: BoothDetailsPartialComponent;
  let fixture: ComponentFixture<BoothDetailsPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothDetailsPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothDetailsPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
