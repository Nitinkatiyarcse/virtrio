import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExternalRegistrationSetsComponent } from './upload-external-registration-sets.component';

describe('UploadExternalRegistrationSetsComponent', () => {
  let component: UploadExternalRegistrationSetsComponent;
  let fixture: ComponentFixture<UploadExternalRegistrationSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadExternalRegistrationSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExternalRegistrationSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
