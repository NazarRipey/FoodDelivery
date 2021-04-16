import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyRatingComponent } from './readonly-rating.component';

describe('ReadonlyRatingComponent', () => {
  let component: ReadonlyRatingComponent;
  let fixture: ComponentFixture<ReadonlyRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadonlyRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
