import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAddButtonComponent } from './calendar-add-button.component';

describe('CalendarAddButtonComponent', () => {
  let component: CalendarAddButtonComponent;
  let fixture: ComponentFixture<CalendarAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarAddButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
