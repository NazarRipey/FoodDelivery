import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRestaurantOrdersComponent } from './manage-restaurant-orders.component';

describe('ManageRestaurantOrdersComponent', () => {
  let component: ManageRestaurantOrdersComponent;
  let fixture: ComponentFixture<ManageRestaurantOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRestaurantOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRestaurantOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
