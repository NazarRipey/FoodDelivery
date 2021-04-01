import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListItemComponent } from './restaurant-list-item.component';

describe('RestaurantListItemComponent', () => {
  let component: RestaurantListItemComponent;
  let fixture: ComponentFixture<RestaurantListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
