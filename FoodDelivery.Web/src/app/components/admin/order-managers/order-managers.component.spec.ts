import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagersComponent } from './order-managers.component';

describe('OrderManagersComponent', () => {
  let component: OrderManagersComponent;
  let fixture: ComponentFixture<OrderManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderManagersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
