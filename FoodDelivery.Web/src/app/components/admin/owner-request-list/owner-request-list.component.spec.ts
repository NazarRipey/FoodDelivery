import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRequestListComponent } from './owner-request-list.component';

describe('OwnerRequestListComponent', () => {
  let component: OwnerRequestListComponent;
  let fixture: ComponentFixture<OwnerRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
