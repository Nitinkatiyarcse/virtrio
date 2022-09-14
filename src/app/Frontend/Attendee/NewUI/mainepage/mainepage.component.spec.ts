import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainepageComponent } from './mainepage.component';

describe('MainepageComponent', () => {
  let component: MainepageComponent;
  let fixture: ComponentFixture<MainepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
