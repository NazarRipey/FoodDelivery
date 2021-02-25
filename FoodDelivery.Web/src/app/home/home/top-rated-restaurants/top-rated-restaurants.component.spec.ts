import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedRestaurantsComponent } from './top-rated-restaurants.component';

describe('TopRatedRestaurantsComponent', () => {
  let component: TopRatedRestaurantsComponent;
  let fixture: ComponentFixture<TopRatedRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRatedRestaurantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
