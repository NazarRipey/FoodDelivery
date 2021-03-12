import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoServerConnectionComponent } from './no-server-connection.component';

describe('NoServerConnectionComponent', () => {
  let component: NoServerConnectionComponent;
  let fixture: ComponentFixture<NoServerConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoServerConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoServerConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
