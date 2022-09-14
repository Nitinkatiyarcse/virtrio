import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastMessageListComponent } from './broadcast-message-list.component';


describe('BroadcastMessageListComponent', () => {
  let component: BroadcastMessageListComponent;
  let fixture: ComponentFixture<BroadcastMessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastMessageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
