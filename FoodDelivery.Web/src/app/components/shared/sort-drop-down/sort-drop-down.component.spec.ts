import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortDropDownComponent } from './sort-drop-down.component';

describe('SortDropDownComponent', () => {
  let component: SortDropDownComponent;
  let fixture: ComponentFixture<SortDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
