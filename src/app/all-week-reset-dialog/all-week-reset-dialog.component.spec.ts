import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWeekResetDialogComponent } from './all-week-reset-dialog.component';

describe('AllWeekResetDialogComponent', () => {
  let component: AllWeekResetDialogComponent;
  let fixture: ComponentFixture<AllWeekResetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWeekResetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWeekResetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
