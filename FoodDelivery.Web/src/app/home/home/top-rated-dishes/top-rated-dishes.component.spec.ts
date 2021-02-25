import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedDishesComponent } from './top-rated-dishes.component';

describe('TopRatedDishesComponent', () => {
  let component: TopRatedDishesComponent;
  let fixture: ComponentFixture<TopRatedDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRatedDishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
