import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRestaurantOrderComponent } from './manage-restaurant-order.component';

describe('ManageRestaurantOrderComponent', () => {
  let component: ManageRestaurantOrderComponent;
  let fixture: ComponentFixture<ManageRestaurantOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRestaurantOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRestaurantOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
