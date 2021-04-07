import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDropDownComponent } from './status-drop-down.component';

describe('StatusDropDownComponent', () => {
  let component: StatusDropDownComponent;
  let fixture: ComponentFixture<StatusDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDropDownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
