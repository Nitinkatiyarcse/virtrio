import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWebinarPartialComponent } from './add-webinar-partial.component';

describe('AddWebinarPartialComponent', () => {
  let component: AddWebinarPartialComponent;
  let fixture: ComponentFixture<AddWebinarPartialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWebinarPartialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWebinarPartialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
