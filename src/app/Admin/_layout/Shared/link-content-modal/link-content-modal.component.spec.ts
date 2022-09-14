import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkContentModalComponent } from './link-content-modal.component';

describe('LinkContentModalComponent', () => {
  let component: LinkContentModalComponent;
  let fixture: ComponentFixture<LinkContentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkContentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
