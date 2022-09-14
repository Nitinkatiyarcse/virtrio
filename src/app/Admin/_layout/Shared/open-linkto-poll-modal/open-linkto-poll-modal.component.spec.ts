import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoPollModalComponent } from './open-linkto-poll-modal.component';

describe('OpenLinktoPollModalComponent', () => {
  let component: OpenLinktoPollModalComponent;
  let fixture: ComponentFixture<OpenLinktoPollModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoPollModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoPollModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
