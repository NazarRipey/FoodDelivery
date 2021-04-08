import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenOrdersComponent } from './taken-orders.component';

describe('TakenOrdersComponent', () => {
  let component: TakenOrdersComponent;
  let fixture: ComponentFixture<TakenOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakenOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakenOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
