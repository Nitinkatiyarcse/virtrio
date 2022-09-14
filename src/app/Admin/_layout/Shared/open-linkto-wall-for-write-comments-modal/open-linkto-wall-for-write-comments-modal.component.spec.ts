import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenLinktoWallForWriteCommentsModalComponent } from './open-linkto-wall-for-write-comments-modal.component';

describe('OpenLinktoWallForWriteCommentsModalComponent', () => {
  let component: OpenLinktoWallForWriteCommentsModalComponent;
  let fixture: ComponentFixture<OpenLinktoWallForWriteCommentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenLinktoWallForWriteCommentsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenLinktoWallForWriteCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
