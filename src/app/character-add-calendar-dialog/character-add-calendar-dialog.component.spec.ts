import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAddCalendarDialogComponent } from './character-add-calendar-dialog.component';

describe('CharacterAddCalendarDialogComponent', () => {
  let component: CharacterAddCalendarDialogComponent;
  let fixture: ComponentFixture<CharacterAddCalendarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterAddCalendarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAddCalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
