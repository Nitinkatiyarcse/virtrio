import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmailtemplateComponent } from './create-emailtemplate.component';

describe('CreateEmailtemplateComponent', () => {
  let component: CreateEmailtemplateComponent;
  let fixture: ComponentFixture<CreateEmailtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmailtemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmailtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
