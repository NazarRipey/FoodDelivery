import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantRequestListComponent } from './restaurant-request-list.component';

describe('RestaurantRequestListComponent', () => {
  let component: RestaurantRequestListComponent;
  let fixture: ComponentFixture<RestaurantRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
