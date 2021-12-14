import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekResetDialogComponent } from './week-reset-dialog.component';

describe('WeekResetDialogComponent', () => {
  let component: WeekResetDialogComponent;
  let fixture: ComponentFixture<WeekResetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekResetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekResetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
