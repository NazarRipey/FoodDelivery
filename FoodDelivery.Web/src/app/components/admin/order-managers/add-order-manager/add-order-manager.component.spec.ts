import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderManagerComponent } from './add-order-manager.component';

describe('AddOrderManagerComponent', () => {
  let component: AddOrderManagerComponent;
  let fixture: ComponentFixture<AddOrderManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
