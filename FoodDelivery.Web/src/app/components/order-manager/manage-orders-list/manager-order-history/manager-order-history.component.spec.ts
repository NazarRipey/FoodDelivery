import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerOrderHistoryComponent } from './manager-order-history.component';

describe('ManagerOrderHistoryComponent', () => {
  let component: ManagerOrderHistoryComponent;
  let fixture: ComponentFixture<ManagerOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerOrderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
