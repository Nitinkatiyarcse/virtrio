import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothCreationImageSidebarComponent } from './booth-creation-image-sidebar.component';

describe('BoothCreationImageSidebarComponent', () => {
  let component: BoothCreationImageSidebarComponent;
  let fixture: ComponentFixture<BoothCreationImageSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothCreationImageSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothCreationImageSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
