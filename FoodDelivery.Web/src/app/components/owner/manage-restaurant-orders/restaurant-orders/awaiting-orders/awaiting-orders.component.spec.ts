import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingOrdersComponent } from './awaiting-orders.component';

describe('AwaitingOrdersComponent', () => {
  let component: AwaitingOrdersComponent;
  let fixture: ComponentFixture<AwaitingOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwaitingOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwaitingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
