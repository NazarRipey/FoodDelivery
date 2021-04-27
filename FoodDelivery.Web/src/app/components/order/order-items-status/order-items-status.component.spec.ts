import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsStatusComponent } from './order-items-status.component';

describe('OrderItemsStatusComponent', () => {
  let component: OrderItemsStatusComponent;
  let fixture: ComponentFixture<OrderItemsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderItemsStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
