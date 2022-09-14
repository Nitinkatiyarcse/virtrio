import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertClientComponent } from './upsert-client.component';

describe('UpsertClientComponent', () => {
  let component: UpsertClientComponent;
  let fixture: ComponentFixture<UpsertClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
