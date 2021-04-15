import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRestaurantsTabComponent } from './manage-restaurants-tab.component';

describe('ManageRestaurantsTabComponent', () => {
  let component: ManageRestaurantsTabComponent;
  let fixture: ComponentFixture<ManageRestaurantsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRestaurantsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRestaurantsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
